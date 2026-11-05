
import { useContext } from "react";
import { Link } from "react-router";
import { useQueries } from "@tanstack/react-query";

import { MoviesContext } from "../contexts/moviesContext";
import { getMovie } from "../api/tmdb-api";

import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromMustWatch";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const MustWatchMoviesPage = () => {
  const {
    mustWatch: movieIds,
    clearMustWatch,
  } = useContext(MoviesContext);

  const movieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    })),
  });

  const isPending = movieQueries.some(
    (query) => query.isPending
  );

  const failedQuery = movieQueries.find(
    (query) => query.isError
  );

  if (movieIds.length === 0) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom>
          Must Watch
        </Typography>

        <Typography sx={{ mb: 3 }}>
          Your Must Watch list is empty.
          Add movies from Upcoming or Explore.
        </Typography>

        <Button
          component={Link}
          to="/movies/explore"
          variant="contained"
        >
          Explore Movies
        </Button>
      </Container>
    );
  }

  if (isPending) {
    return <Spinner />;
  }

  if (failedQuery) {
    return (
      <Typography color="error" sx={{ p: 3 }}>
        {failedQuery.error.message}
      </Typography>
    );
  }

  const movies = movieQueries.map((query) => ({
    ...query.data,
    genre_ids: (query.data.genres ?? []).map(
      (genre) => genre.id
    ),
  }));

  return (
    <>
      <Box
        sx={{
          px: 3,
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="body1">
          {movieIds.length} saved movies
        </Typography>

        <Button
          variant="outlined"
          color="error"
          onClick={clearMustWatch}
        >
          Clear Must Watch
        </Button>
      </Box>

      <PageTemplate
        title="Must Watch"
        movies={movies}
        action={(movie) => (
          <>
            <RemoveFromMustWatchIcon movie={movie} />
            <AddToFavoritesIcon movie={movie} />
          </>
        )}
      />
    </>
  );
};

export default MustWatchMoviesPage;
