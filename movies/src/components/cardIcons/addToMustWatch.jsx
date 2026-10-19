import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToMustWatchIcon = ({ movie }) => {
  const { addToMustWatch } = useContext(MoviesContext);

  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    addToMustWatch(movie);
  };

  return (
    <IconButton
      aria-label="add to must watch"
      onClick={handleAddToMustWatch}
    >
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;