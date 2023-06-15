import React from "react";
import "./Search.css";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [searchClicked, setSearchClicked] = useState(false);

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&query=${searchText}&page=${page}`,
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
      setSearchClicked(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (searchClicked) {
      window.scroll(0, 0);
      fetchSearch();
    }
  }, [type, page]);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            InputProps={{
              className: "searchInput",
              style: { color: "#fff" },
              autoComplete: "off",
            }}
            InputLabelProps={{
              className: "searchInputLabel",
              style: { color: "#fff" },
            }}
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
      </ThemeProvider>
      {searchClicked && (
        <div className="trending">
          {content.length > 0 ? (
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={"movie"}
                vote_average={c.vote_average}
                overview={c.overview}
              />
            ))
          ) : (
            <h2>No Movies Found</h2>
          )}
        </div>
      )}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  );
};

export default Search;
