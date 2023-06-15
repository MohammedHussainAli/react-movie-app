import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import axios from "axios";

const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
          {
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjYwN2I4ZTNlYTA4NDZlNWUwNWRjZjczODQwYWYzYyIsInN1YiI6IjY0OGE3M2FjNTU5ZDIyMDExYzRhMzZhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GOvct6FWpoUaKCPuYWbuSHuPRIAiu8XBTYcFNYmUr5o",
            },
          }
        );
        setContent(response.data.results);
        setNumOfPages(response?.data?.total_pages);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Discover Movies</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
              overview={c.overview}
            />
          ))}
      </div>
      {numOfPages > 1 && <CustomPagination setPage={setPage} />}
    </div>
  );
};

export default Movies;
