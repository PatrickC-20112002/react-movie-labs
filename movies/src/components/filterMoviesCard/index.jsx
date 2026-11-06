
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../api/tmdb-api";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const FilterMoviesCard = (props) => {
  const {
    data,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        mb: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{
          xs: "stretch",
          md: "center",
        }}
      >
        <TextField
          label="Filter by title"
          type="search"
          value={props.titleFilter}
          onChange={(event) =>
            props.onUserInput(
              "name",
              event.target.value
            )
          }
          fullWidth
          size="small"
          sx={{ flex: 1 }}
        />

        <FormControl
          size="small"
          sx={{
            width: {
              xs: "100%",
              md: 240,
            },
          }}
        >
          <InputLabel id="genre-label">
            Genre
          </InputLabel>

          <Select
            labelId="genre-label"
            label="Genre"
            value={props.genreFilter}
            onChange={(event) =>
              props.onUserInput(
                "genre",
                event.target.value
              )
            }
            disabled={isPending || isError}
          >
            <MenuItem value="0">
              All genres
            </MenuItem>

            {(data?.genres ?? []).map((genre) => (
              <MenuItem
                key={genre.id}
                value={genre.id}
              >
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {isError && (
        <Typography
          color="error"
          variant="body2"
          sx={{ mt: 1 }}
        >
          Could not load genres: {error.message}
        </Typography>
      )}
    </Paper>
  );
};

export default FilterMoviesCard;