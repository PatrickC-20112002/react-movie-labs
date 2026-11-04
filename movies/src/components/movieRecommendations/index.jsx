
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

const MovieRecommendations = ({ movieId }) => {
  const {
    data,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["recommendations", { id: movieId }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Typography color="error" sx={{ mt: 3 }}>
        {error.message}
      </Typography>
    );
  }

  const recommendations = (data.results ?? [])
    .filter((movie) => movie.id !== Number(movieId))
    .slice(0, 8);

  return (
    <Box sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        You Might Also Like
      </Typography>

      {recommendations.length === 0 ? (
        <Typography color="text.secondary">
          No recommendations available for this movie.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {recommendations.map((movie) => (
            <Grid
              key={movie.id}
              size={{ xs: 6, sm: 4, md: 3 }}
            >
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardActionArea
                  component={Link}
                  to={`/movies/${movie.id}`}
                  sx={{ height: "100%" }}
                >
                  {movie.poster_path ? (
                    <CardMedia
                      component="img"
                      height="270"
                      image={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={movie.title}
                      sx={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 270,
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
                      sx={{ mt: 1 }}
                    >
                      {movie.release_date?.slice(0, 4) ||
                        "Year unknown"}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 1,
                      }}
                    >
                      <StarIcon
                        color="warning"
                        fontSize="small"
                      />

                      <Typography variant="body2">
                        {Number(
                          movie.vote_average ?? 0
                        ).toFixed(1)} / 10
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MovieRecommendations;
