import { useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import {
  getPersonDetails,
  getPersonMovieCredits,
} from "../api/tmdb-api";

import Spinner from "../components/spinner";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const PersonDetailsPage = () => {
  const { id } = useParams();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(20);

  const personQuery = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPersonDetails,
  });

  const creditsQuery = useQuery({
    queryKey: ["personMovieCredits", { id }],
    queryFn: getPersonMovieCredits,
  });

  if (personQuery.isPending || creditsQuery.isPending) {
    return <Spinner />;
  }

  if (personQuery.isError || creditsQuery.isError) {
    return (
      <Typography color="error" sx={{ p: 3 }}>
        {personQuery.error?.message ||
          creditsQuery.error?.message}
      </Typography>
    );
  }

  const person = personQuery.data;
  const credits = creditsQuery.data;

  // Remove duplicate movie entries from the filmography.
  const uniqueMovies = Array.from(
    new Map(
      (credits.cast ?? []).map((movie) => [
        movie.id,
        movie,
      ])
    ).values()
  );

  const filteredMovies = uniqueMovies
    .filter((movie) =>
      movie.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rating") {
        return (b.vote_average ?? 0) -
          (a.vote_average ?? 0);
      }

      const fallback =
        sortBy === "oldest"
          ? "9999-12-31"
          : "0000-00-00";

      const dateA = a.release_date || fallback;
      const dateB = b.release_date || fallback;

      return sortBy === "oldest"
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    });

  const visibleMovies = filteredMovies.slice(
    0,
    visibleCount
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setVisibleCount(20);
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
    setVisibleCount(20);
  };

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        p: { xs: 2, md: 4 },
      }}
    >
      <Button component={Link} to="/" sx={{ mb: 3 }}>
        Browse Movies
      </Button>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          {person.profile_path ? (
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={person.name}
              sx={{
                width: "100%",
                maxWidth: 400,
                borderRadius: 2,
                display: "block",
              }}
            />
          ) : (
            <Paper
              sx={{
                height: 450,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar sx={{ width: 120, height: 120 }}>
                {person.name?.charAt(0)}
              </Avatar>
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h3" gutterBottom>
            {person.name}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
          >
            Known for:{" "}
            {person.known_for_department || "Unknown"}
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Born:</strong>{" "}
            {person.birthday || "Not available"}
          </Typography>

          {person.deathday && (
            <Typography variant="body1">
              <strong>Died:</strong> {person.deathday}
            </Typography>
          )}

          <Typography variant="body1">
            <strong>Place of birth:</strong>{" "}
            {person.place_of_birth || "Not available"}
          </Typography>

          <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
            Biography
          </Typography>

          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              lineHeight: 1.8,
            }}
          >
            {person.biography ||
              "No biography is available for this person."}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Filmography
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <TextField
            label="Search filmography"
            value={search}
            onChange={handleSearch}
            sx={{ flex: 1 }}
          />

          <TextField
            select
            label="Sort films"
            value={sortBy}
            onChange={handleSort}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="newest">
              Newest first
            </MenuItem>

            <MenuItem value="oldest">
              Oldest first
            </MenuItem>

            <MenuItem value="rating">
              Highest rated
            </MenuItem>
          </TextField>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Showing {visibleMovies.length} of{" "}
          {filteredMovies.length} films
        </Typography>

        {filteredMovies.length === 0 ? (
          <Typography>
            No matching films found.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {visibleMovies.map((movie) => (
              <Grid
                key={movie.id}
                size={{
                  xs: 6,
                  sm: 4,
                  md: 3,
                  lg: 2,
                }}
              >
                <Card sx={{ height: "100%" }}>
                  <CardActionArea
                    component={Link}
                    to={`/movies/${movie.id}`}
                    sx={{ height: "100%" }}
                  >
                    {movie.poster_path ? (
                      <CardMedia
                        component="img"
                        height="250"
                        image={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                        alt={movie.title}
                        sx={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 250,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "action.hover",
                          p: 2,
                        }}
                      >
                        <Typography
                          color="text.secondary"
                          align="center"
                        >
                          No poster available
                        </Typography>
                      </Box>
                    )}

                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                      >
                        {movie.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {movie.release_date?.slice(0, 4) ||
                          "Year unknown"}
                      </Typography>

                      {movie.character && (
                        <Typography
                          variant="body2"
                          sx={{ mt: 1 }}
                        >
                          As {movie.character}
                        </Typography>
                      )}

                      <Typography
                        variant="body2"
                        sx={{ mt: 1 }}
                      >
                        Rating:{" "}
                        {Number(
                          movie.vote_average || 0
                        ).toFixed(1)}/10
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {visibleCount < filteredMovies.length && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              onClick={() =>
                setVisibleCount((count) => count + 20)
              }
            >
              Show More Movies
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PersonDetailsPage;