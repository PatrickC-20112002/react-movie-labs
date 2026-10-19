import IconButton from "@mui/material/IconButton";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router";

const WriteReviewIcon = ({ movie }) => {
  return (
    <IconButton
      component={Link}
      to="/reviews/form"
      state={{ movieId: movie.id }}
      aria-label="write review"
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default WriteReviewIcon;