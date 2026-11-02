import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router";

const MovieCast = ({ movieId }) => {
  const {
    data,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["credits", { id: movieId }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Typography color="error">
        {error.message}
      </Typography>
    );
  }

  const cast = (data.cast ?? []).slice(0, 12);

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Cast
      </Typography>

      {cast.length === 0 ? (
        <Typography>
          No cast information available.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {cast.map((actor) => (
            <Grid
              key={actor.credit_id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <Card sx={{ height: "100%" }}>
                <CardActionArea
                    component={Link}
                    to={`/people/${actor.id}`}
                    sx={{ height: "100%" }}
                >
                {actor.profile_path ? (
                  <CardMedia
                    component="img"
                    height="260"
                    image={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    sx={{ objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 260,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "action.hover",
                    }}
                  >
                    <Avatar sx={{ width: 80, height: 80 }}>
                      {actor.name?.charAt(0)}
                    </Avatar>
                  </Box>
                )}

                <CardContent>
                  <Typography variant="h6">
                    {actor.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {actor.character || "Unknown character"}
                  </Typography>
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

export default MovieCast;