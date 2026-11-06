
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getAdvancedMovies,
  getGenres,
} from "../api/tmdb-api";

import MovieList from "../components/movieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import Spinner from "../components/spinner";
import Header from "../components/headerMovieList";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ExploreMoviesPage = () => {
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [sortBy, setSortBy] = useState("popularity.desc");

  // Apply the year only after four valid digits have been entered.
  const selectedYear =
    /^\d{4}$/.test(year) &&
    Number(year) >= 1888 &&
    Number(year) <= 2100
      ? year
      : "";

  const genresQuery = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const {
    data,
    error,
    isPending,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [
      "advancedDiscover",
      {
        page,
        genre,
        year: selectedYear,
        minRating,
        sortBy,
      },
    ],
    queryFn: getAdvancedMovies,
  });

  const updateFilter = (setter, value) => {
    setter(value);
    setPage(1);
  };

  const resetFilters = () => {
    setPage(1);
    setGenre("");
    setYear("");
    setMinRating("0");
    setSortBy("popularity.desc");
  };

  const totalPages = Math.min(
    data?.total_pages ?? 1,
    500
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
        title="Explore Movies"
        description="Discover movies using filters, sorting and pagination."
      />

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              select
              fullWidth
              label="Genre"
              value={genre}
              onChange={(event) =>
                updateFilter(
                  setGenre,
                  event.target.value
                )
              }
            >
              <MenuItem value="">
                All genres
              </MenuItem>

              {(genresQuery.data?.genres ?? []).map(
                (item) => (
                  <MenuItem
                    key={item.id}
                    value={String(item.id)}
                  >
                    {item.name}
                  </MenuItem>
                )
              )}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              label="Release year"
              type="number"
              value={year}
              onChange={(event) =>
                updateFilter(
                  setYear,
                  event.target.value
                )
              }
              slotProps={{
                htmlInput: {
                  min: 1888,
                  max: 2100,
                  step: 1,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              select
              fullWidth
              label="Minimum rating"
              value={minRating}
              onChange={(event) =>
                updateFilter(
                  setMinRating,
                  event.target.value
                )
              }
            >
              <MenuItem value="0">
                Any rating
              </MenuItem>
              <MenuItem value="5">
                5+ / 10
              </MenuItem>
              <MenuItem value="6">
                6+ / 10
              </MenuItem>
              <MenuItem value="7">
                7+ / 10
              </MenuItem>
              <MenuItem value="8">
                8+ / 10
              </MenuItem>
              <MenuItem value="9">
                9+ / 10
              </MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              select
              fullWidth
              label="Sort by"
              value={sortBy}
              onChange={(event) =>
                updateFilter(
                  setSortBy,
                  event.target.value
                )
              }
            >
              <MenuItem value="popularity.desc">
                Most popular
              </MenuItem>

              <MenuItem value="vote_average.desc">
                Highest rated
              </MenuItem>

              <MenuItem value="primary_release_date.desc">
                Newest releases
              </MenuItem>

              <MenuItem value="vote_count.desc">
                Most votes
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Button
          variant="outlined"
          onClick={resetFilters}
          sx={{ mt: 2 }}
        >
          Reset Filters
        </Button>
      </Paper>

      {genresQuery.isError && (
        <Typography color="error" sx={{ mb: 2 }}>
          Could not load genre options.
        </Typography>
      )}

      {isPending ? (
        <Spinner />
      ) : isError ? (
        <Typography color="error">
          {error.message}
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography color="text.secondary">
              {data.total_results.toLocaleString()} results
            </Typography>

            <Typography color="text.secondary">
              Page {page} of {totalPages}
              {isFetching ? " · Refreshing" : ""}
            </Typography>
          </Box>

          {data.results.length === 0 ? (
            <Typography sx={{ py: 4 }}>
              No movies match these filters.
            </Typography>
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

          {totalPages > 1 && (
            <Stack
              alignItems="center"
              sx={{ mt: 4, mb: 3 }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) =>
                  setPage(newPage)
                }
                color="primary"
                size="large"
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

export default ExploreMoviesPage;
