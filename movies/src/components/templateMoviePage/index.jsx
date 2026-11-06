
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMovieImages } from "../../api/tmdb-api";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const TemplateMoviePage = ({ movie, children }) => {
  const [showAllPosters, setShowAllPosters] = useState(false);

  const {
    data,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["images", { id: movie.id }],
    queryFn: getMovieImages,
  });

  const posters = (data?.posters ?? []).filter(
    (poster) =>
      poster.file_path &&
      poster.file_path !== movie.poster_path
  );

  const visiblePosters = showAllPosters
    ? posters
    : posters.slice(0, 6);

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: { xs: 2, md: 3 },
        px: { xs: 2, sm: 3 },
      }}
    >
      {children}

      <Box sx={{ mt: 5 }}>
        {isPending ? (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Loading additional posters...
          </Typography>
        ) : isError ? (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Additional posters could not be loaded.
          </Typography>
        ) : posters.length > 0 ? (
          <>
            <Divider sx={{ mb: 4 }} />

            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 2 }}
            >
              More Posters
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(3, minmax(0, 1fr))",
                  md: "repeat(6, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {visiblePosters.map((poster) => (
                <Box
                  key={poster.file_path}
                  component="a"
                  href={`https://image.tmdb.org/t/p/original${poster.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View another ${movie.title} poster`}
                >
                  <Box
                    component="img"
                    src={`https://image.tmdb.org/t/p/w342${poster.file_path}`}
                    alt={`${movie.title} alternative poster`}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      aspectRatio: "2 / 3",
                      objectFit: "cover",
                      display: "block",
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                </Box>
              ))}
            </Box>

            {posters.length > 6 && (
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setShowAllPosters((previous) => !previous)
                  }
                >
                  {showAllPosters
                    ? "Show Fewer Posters"
                    : `Show All ${posters.length} Posters`}
                </Button>
              </Box>
            )}
          </>
        ) : null}
      </Box>
    </Container>
  );
};

export default TemplateMoviePage;