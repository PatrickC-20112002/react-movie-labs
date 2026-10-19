import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => (
        <AddToMustWatchIcon movie={movie} />
      )}
    />
  );
};

export default UpcomingMoviesPage;