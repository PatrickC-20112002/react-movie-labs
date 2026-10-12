import React, {
  useEffect,
  useState
} from "react";

import PageTemplate
  from "../components/templateMovieListPage";

import {
  getUpcomingMovies
} from "../api/tmdb-api";

const UpcomingMoviesPage = () => {

  const [movies, setMovies] =
    useState([]);

  useEffect(() => {
    getUpcomingMovies()
      .then((movies) => {
        setMovies(movies);
      });
  }, []);

  const addToFavorites = (movieId) => {
    const updatedMovies =
      movies.map((m) =>
        m.id === movieId
          ? {
              ...m,
              favorite: true
            }
          : m
      );

    setMovies(updatedMovies);
  };

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      selectFavorite={addToFavorites}
    />
  );
};

export default UpcomingMoviesPage;