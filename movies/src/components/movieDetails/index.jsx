import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRateIcon from "@mui/icons-material/StarRate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CloseIcon from "@mui/icons-material/Close";

import MovieHeader from "../headerMovie";
import MovieReviews from "../movieReviews";
import MovieCast from "../movieCast";
import MovieCrew from "../movieCrew";
import MovieRecommendations from "../movieRecommendations";

import { MoviesContext } from "../../contexts/moviesContext";
import placeholder from "../../images/film-poster-placeholder.png";

const chipRow = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 1,
  p: 1.5,
  mb: 1.5,
};

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const { myReviews } = useContext(MoviesContext);
  const userReview = myReviews[movie.id];

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : placeholder;

  const rating =
    movie.vote_count > 0
      ? `${Number(movie.vote_average).toFixed(1)} (${movie.vote_count})`
      : "Not rated";

  const revenue =
    movie.revenue > 0
      ? `$${movie.revenue.toLocaleString("en-US")}`
      : "Revenue unknown";

  return (
    <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Grid container spacing={3} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Box
            component="img"
            src={poster}
            alt={`${movie.title} poster`}
            sx={{
              display: "block",
              width: "100%",
              maxWidth: {
                xs: 320,
                md: "100%",
              },
              aspectRatio: "2 / 3",
              objectFit: "cover",
              borderRadius: 1,
              mx: { xs: "auto", md: 0 },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <MovieHeader movie={movie} />

          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 1 }}
          >
            Overview
          </Typography>

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.7,
              mb: 3,
            }}
          >
            {movie.overview ||
              "No overview is available for this movie."}
          </Typography>

          <Paper variant="outlined" sx={chipRow}>
            <Chip
              label="Genres"
              color="primary"
              size="small"
            />

            {(movie.genres ?? []).map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                size="small"
              />
            ))}

            {(movie.genres ?? []).length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Not available
              </Typography>
            )}
          </Paper>

          <Paper variant="outlined" sx={chipRow}>
            <Chip
              label="Production Countries"
              color="primary"
              size="small"
            />

            {(movie.production_countries ?? []).map(
              (country) => (
                <Chip
                  key={country.iso_3166_1}
                  label={country.name}
                  size="small"
                />
              )
            )}

            {(movie.production_countries ?? []).length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Not available
              </Typography>
            )}
          </Paper>

          <Paper variant="outlined" sx={chipRow}>
            <Chip
              icon={<AccessTimeIcon />}
              label={
                movie.runtime
                  ? `${movie.runtime} min.`
                  : "Runtime unknown"
              }
              size="small"
            />

            <Chip
              icon={<MonetizationIcon />}
              label={revenue}
              size="small"
            />

            <Chip
              icon={<StarRateIcon />}
              label={rating}
              size="small"
            />

            <Chip
              label={
                movie.release_date
                  ? `Released: ${movie.release_date}`
                  : "Release date unknown"
              }
              size="small"
            />
          </Paper>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<RateReviewIcon />}
              onClick={() => setDrawerOpen(true)}
            >
              View Reviews
            </Button>
          </Box>

          {userReview && (
            <Paper
              variant="outlined"
              sx={{
                mt: 3,
                p: 2,
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ mb: 1 }}
              >
                Your Review
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {userReview.author || "You"}
                {" · "}
                Rating: {userReview.rating}/5
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                  overflowWrap: "anywhere",
                }}
              >
                {userReview.review}
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <MovieCast movieId={movie.id} />

      <Divider sx={{ my: 3 }} />

      <MovieCrew movieId={movie.id} />

      <Divider sx={{ my: 3 }} />

      <MovieRecommendations movieId={movie.id} />

      <Dialog
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        fullWidth
        maxWidth="md"
        scroll="paper"
        aria-labelledby="movie-reviews-title"
        slotProps={{
          paper: {
            sx: {
              maxHeight: "80vh",
            },
          },
        }}
      >
        <DialogTitle
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            py: 2,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              id="movie-reviews-title"
              component="h2"
              variant="h6"
            >
              Reviews
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {movie.title}
            </Typography>
          </Box>

          <IconButton
            aria-label="Close reviews"
            onClick={() => setDrawerOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          <MovieReviews
            movie={movie}
            onClose={() => setDrawerOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MovieDetails;
