
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { searchMovies } from "../api/tmdb-api";

import MovieList from "../components/movieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import Spinner from "../components/spinner";
import Header from "../components/headerMovieList";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";

const SearchMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = (searchParams.get("q") ?? "").trim();

  const requestedPage = Number(
    searchParams.get("page") ?? 1
  );

  const page =
    Number.isInteger(requestedPage) &&
    requestedPage >= 1 &&
    requestedPage <= 500
      ? requestedPage
      : 1;

  const {
    data,
    error,
    isPending,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["movieSearch", { query, page }],
    queryFn: searchMovies,
    enabled: query.length > 0,
  });

  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newQuery = String(
      formData.get("movieTitle") ?? ""
    ).trim();

    setSearchParams(
      newQuery ? { q: newQuery } : {}
    );
  };

  const handlePageChange = (_, newPage) => {
    setSearchParams({
      q: query,
      page: String(newPage),
    });
  };

  const totalPages = Math.max(
    1,
    Math.min(data?.total_pages ?? 1, 500)
  );

  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      <Header
        title="Search Movies"
        description="Search the TMDB movie catalogue by title."
      />

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 2,
          }}
        >
          <TextField
            key={query}
            name="movieTitle"
            label="Movie title"
            placeholder="e.g. The Dark Knight"
            defaultValue={query}
            fullWidth
            autoComplete="off"
          />

          <Button
            type="submit"
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{ minWidth: 150 }}
          >
            Search
          </Button>
        </Box>
      </Paper>

      {!query ? (
        <Paper sx={{ p: 5, textAlign: "center" }}>
          <SearchIcon
            sx={{ fontSize: 60, mb: 2 }}
            color="disabled"
          />

          <Typography variant="h6">
            Find your next movie
          </Typography>

          <Typography color="text.secondary">
            Enter a movie title above to begin searching.
          </Typography>
        </Paper>
      ) : isPending ? (
        <Spinner />
      ) : isError ? (
        <Typography color="error">
          {error.message}
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="h6">
              Results for "{query}"
            </Typography>

            <Typography color="text.secondary">
              {data.total_results.toLocaleString()} results
              {isFetching ? " · Refreshing" : ""}
            </Typography>
          </Box>

          {data.results.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6">
                No movies found
              </Typography>

              <Typography color="text.secondary">
                Try another movie title or spelling.
              </Typography>
            </Paper>
          ) : (
            <Grid container>
              <MovieList
                movies={data.results}
                action={(movie) => (
                  <>
                    <AddToFavoritesIcon movie={movie} />
                    <AddToMustWatchIcon movie={movie} />
                  </>
                )}
              />
            </Grid>
          )}

          {data.results.length > 0 && totalPages > 1 && (
            <Stack
              alignItems="center"
              spacing={2}
              sx={{ mt: 4, mb: 3 }}
            >
              <Typography color="text.secondary">
                Page {page} of {totalPages}
              </Typography>

              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Stack>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchMoviesPage;
