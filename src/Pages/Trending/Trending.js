import React from "react";
import axios from "axios";
import "./Trending.css";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [trendingData, setTrendingData] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1${page}`,
          {
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjYwN2I4ZTNlYTA4NDZlNWUwNWRjZjczODQwYWYzYyIsInN1YiI6IjY0OGE3M2FjNTU5ZDIyMDExYzRhMzZhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GOvct6FWpoUaKCPuYWbuSHuPRIAiu8XBTYcFNYmUr5o",
            },
          }
        );
        setTrendingData(response?.data?.results);
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
      <span className="pageTitle">Trending Today</span>
      <div className="trending">
        {trendingData &&
          trendingData.map((c) => (
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
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Trending;
