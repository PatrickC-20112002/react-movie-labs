import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import { MoviesContext } from "../../contexts/moviesContext";

const AddToMustWatchIcon = ({ movie }) => {
  const { mustWatch, addToMustWatch } =
    useContext(MoviesContext);

  const isAdded = mustWatch.includes(movie.id);

  const handleClick = (event) => {
    event.preventDefault();

    if (!isAdded) {
      addToMustWatch(movie);
    }
  };

  return (
    <Tooltip
      title={
        isAdded
          ? "Already in Must Watch"
          : "Add to Must Watch"
      }
    >
      <IconButton
        aria-label={
          isAdded
            ? "already in must watch"
            : "add to must watch"
        }
        onClick={handleClick}
      >
        {isAdded ? (
          <PlaylistAddCheckIcon
            color="success"
            fontSize="large"
          />
        ) : (
          <PlaylistAddIcon
            color="primary"
            fontSize="large"
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default AddToMustWatchIcon;