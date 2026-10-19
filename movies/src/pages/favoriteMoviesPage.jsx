import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const { favorites: movieIds } = useContext(MoviesContext);

  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    })),
  });

  const isPending = favoriteMovieQueries.some(
    (query) => query.isPending
  );

  const failedQuery = favoriteMovieQueries.find(
    (query) => query.isError
  );

  if (isPending) return <Spinner />;

  if (failedQuery) {
    return <h1>{failedQuery.error.message}</h1>;
  }

  const movies = favoriteMovieQueries.map((query) => ({
    ...query.data,
    genre_ids: query.data.genres.map((genre) => genre.id),
  }));

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromFavorites movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;