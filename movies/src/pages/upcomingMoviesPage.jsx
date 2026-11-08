import { useQuery } from "@tanstack/react-query";

import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import Spinner from "../components/spinner";

import Typography from "@mui/material/Typography";

const UpcomingMoviesPage = () => {
  const {
    data,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Typography color="error" sx={{ p: 3 }}>
        {error.message}
      </Typography>
    );
  }

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={data.results ?? []}
      action={(movie) => (
        <AddToMustWatchIcon movie={movie} />
      )}
    />
  );
};

export default UpcomingMoviesPage;
