
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const MovieHeader = ({ movie }) => {
  const hasWebsite = /^https?:\/\//i.test(
    movie.homepage || ""
  );

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 600,
          mb: 1,
        }}
      >
        {movie.title}
      </Typography>

      {movie.tagline && (
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{
            fontStyle: "italic",
            mb: 2,
          }}
        >
          {movie.tagline}
        </Typography>
      )}

      {hasWebsite && (
        <Button
          component="a"
          href={movie.homepage}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="small"
          endIcon={<OpenInNewIcon />}
        >
          Official Website
        </Button>
      )}
    </Box>
  );
};

export default MovieHeader;