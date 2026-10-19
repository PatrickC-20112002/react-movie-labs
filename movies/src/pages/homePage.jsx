import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const HomePage = () => {
  const {
    data,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  // Temporary compatibility with the old favourites page.
  // This feature will be replaced by React Context in Step 4.
  const favorites = movies.filter((m) => m.favorite);

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  // Temporary placeholder.
  const addToFavorites = (movieId) => true;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      selectFavorite={addToFavorites}
    />
  );
};

export default HomePage;