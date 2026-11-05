import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromMustWatchIcon = ({ movie }) => {
  const { removeFromMustWatch } =
    useContext(MoviesContext);

  return (
    <IconButton
      aria-label="remove from must watch"
      onClick={() => removeFromMustWatch(movie)}
    >
      <DeleteIcon color="error" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchIcon;