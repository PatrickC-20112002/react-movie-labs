import React from "react";
import PageTemplate from "../components/templateMovieListPage";

const FavoriteMoviesPage = () => {

  const toDo = () => true;

  const movies =
    JSON.parse(
      localStorage.getItem("favorites")
    );

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={movies}
      selectFavorite={toDo}
    />
  );
};

export default FavoriteMoviesPage;