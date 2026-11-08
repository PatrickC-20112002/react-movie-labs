import { useLocation, Link } from "react-router";

import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const MovieReviewPage = () => {
  const location = useLocation();

  const movie = location.state?.movie;
  const review = location.state?.review;

  if (!movie || !review) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Review unavailable
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          This review needs to be opened from a movie's
          Reviews section.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
        >
          Browse Movies
        </Button>
      </Container>
    );
  }

  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
