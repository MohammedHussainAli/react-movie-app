import React from "react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    text: {
      primary: "#FFFFFF", // Set the primary text color as white
    },
  },
});

export default function CustomPagination({ setPage, numOfPages = 10 }) {
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          color="primary"
          shape="rounded"
          size="large"
          hideNextButton
          hidePrevButton
          style={{ color: "white" }} // Set the text color to white
        />
      </ThemeProvider>
    </div>
  );
}
