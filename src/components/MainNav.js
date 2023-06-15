import React, { useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/movies");
    } else if (value === 2) {
      navigate("/search");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll behavior
    });
  }, [value, navigate]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        boxShadow: `0px 1px 5px black`,
        background: `linear-gradient(
            180deg,
            rgba(22, 77, 146, 1) 0%,
            rgba(0, 180, 141, 1) 100%
          )`,
        zIndex: 100,
      }}
    >
      <BottomNavigationAction
        style={{
          color: value === 0 ? "darkBlue" : "white",
          backgroundColor: value === 0 ? "white" : "transparent",
          borderRadius: value === 0 ? "5%" : 0,
        }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{
          color: value === 1 ? "darkBlue" : "white",
          backgroundColor: value === 1 ? "white" : "transparent",
          borderRadius: value === 1 ? "5%" : 0,
        }}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{
          color: value === 2 ? "darkBlue" : "white",
          backgroundColor: value === 2 ? "white" : "transparent",
          borderRadius: value === 2 ? "5%" : 0,
        }}
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
