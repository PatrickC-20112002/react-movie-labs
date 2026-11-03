
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const crewGroups = [
  {
    title: "Directing",
    jobs: ["Director"],
    limit: 4,
  },
  {
    title: "Writing",
    jobs: ["Screenplay", "Writer", "Story"],
    limit: 4,
  },
  {
    title: "Production",
    jobs: ["Producer", "Executive Producer"],
    limit: 4,
  },
  {
    title: "Camera, Editing & Music",
    jobs: [
      "Director of Photography",
      "Editor",
      "Original Music Composer",
    ],
    limit: 6,
  },
];

const MovieCrew = ({ movieId }) => {
  const { data, error, isPending, isError } = useQuery({
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

  const groups = crewGroups
    .map((group) => {
      const matchingCrew = (data.crew ?? []).filter(
        (person) => group.jobs.includes(person.job)
      );

      const uniqueCrew = Array.from(
        new Map(
          matchingCrew.map((person) => [person.id, person])
        ).values()
      );

      return {
        ...group,
        members: uniqueCrew.slice(0, group.limit),
      };
    })
    .filter((group) => group.members.length > 0);

  return (
    <Box sx={{ mt: 5, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Behind the Scenes
      </Typography>

      {groups.length === 0 ? (
        <Typography>
          No crew information available.
        </Typography>
      ) : (
        groups.map((group) => (
          <Paper
            key={group.title}
            sx={{ p: 2, mb: 2 }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              {group.title}
            </Typography>

            <Grid container spacing={2}>
              {group.members.map((person) => (
                <Grid
                  key={person.id}
                  size={{ xs: 12, sm: 6, lg: 4 }}
                >
                  <Card sx={{ height: "100%" }}>
                    <CardActionArea
                      component={Link}
                      to={`/people/${person.id}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 2,
                        p: 1.5,
                        minHeight: 100,
                      }}
                    >
                      <Avatar
                        alt={person.name}
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                            : undefined
                        }
                        sx={{
                          width: 64,
                          height: 64,
                          flexShrink: 0,
                        }}
                      >
                        {person.name?.charAt(0)}
                      </Avatar>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                        >
                          {person.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {person.job}
                        </Typography>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default MovieCrew;
