
import { useContext } from "react";
import { Link } from "react-router";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";

import { MoviesContext } from "../../contexts/moviesContext";
import placeholder from "../../images/film-poster-placeholder.png";

const MovieCard = ({ movie, action }) => {
  const { favorites } = useContext(MoviesContext);
  const isFavorite = favorites.includes(movie.id);

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : placeholder;

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        image={poster}
        alt={`${movie.title} poster`}
        sx={{
          width: "100%",
          aspectRatio: "2 / 3",
          objectFit: "cover",
          bgcolor: "action.hover",
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            component="h3"
            fontWeight="bold"
            sx={{
              minHeight: "3em",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.title}
          </Typography>

          {isFavorite && (
            <FavoriteIcon
              color="error"
              fontSize="small"
              titleAccess="In Favourites"
            />
          )}
        </Box>

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <CalendarIcon fontSize="small" />
            {movie.release_date || "Date unknown"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <StarRateIcon fontSize="small" />
            {movie.vote_count > 0
              ? Number(movie.vote_average).toFixed(1)
              : "Not rated"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
          px: 2,
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {action?.(movie)}
        </Box>

        <Button
          component={Link}
          to={`/movies/${movie.id}`}
          variant="outlined"
          size="small"
        >
          More Info
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;