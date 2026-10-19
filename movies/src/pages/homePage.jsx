import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const HomePage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={data.results}
    />
  );
};

export default HomePage;