import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToMustWatchIcon = ({ movie }) => {
  return (
    <IconButton aria-label="add to must watch">
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;