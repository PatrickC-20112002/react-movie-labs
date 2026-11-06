
import { useState } from "react";

import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const MovieListPageTemplate = ({ movies, title, action }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");

  const genreId = Number(genreFilter);

  const displayedMovies = movies
    .filter((movie) =>
      movie.title
        .toLowerCase()
        .includes(nameFilter.toLowerCase())
    )
    .filter((movie) =>
      genreId === 0 ||
      (movie.genre_ids ?? []).includes(genreId)
    );

  const handleChange = (type, value) => {
    if (type === "name") {
      setNameFilter(value);
    } else {
      setGenreFilter(value);
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: 2,
      }}
    >
      <Header title={title} />

      <FilterCard
        onUserInput={handleChange}
        titleFilter={nameFilter}
        genreFilter={genreFilter}
      />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 1 }}
      >
        Showing {displayedMovies.length} of{" "}
        {movies.length} movies
      </Typography>

      {displayedMovies.length === 0 ? (
        <Typography sx={{ py: 4 }}>
          No movies match the selected filters.
        </Typography>
      ) : (
        <Grid container>
          <MovieList
            movies={displayedMovies}
            action={action}
          />
        </Grid>
      )}
    </Box>
  );
};

export default MovieListPageTemplate;