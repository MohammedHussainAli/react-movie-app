import Badge from "@mui/material/Badge";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const SingleContent = ({ overview, id, poster, title, date, vote_average }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="media" onClick={handleOpen}>
        <Badge
          badgeContent={vote_average}
          color={vote_average > 6 ? "primary" : "secondary"}
        />
        <img
          className="poster"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <b className="title">{title}</b>
        <span className="subTitle">
          {"Movie"}
          <span className="subTitle">{date}</span>
        </span>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        className="custom-dialog"
      >
        <DialogTitle className="title2">
          {" "}
          <span className="ContentModal__title">
            {title} ({(date || "-----").substring(0, 4)})
          </span>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <div className="poster-wrapper">
            <img
              className="poster"
              src={poster ? `${img_300}${poster}` : unavailable}
              alt={title}
            />
          </div>
          <div className="overview">
            {overview ? (
              overview
            ) : (
              <span className="unavailable">Overview not available</span>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SingleContent;
