import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { useState, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router";

const ratings = [
  { value: 5, label: "Excellent" },
  { value: 4, label: "Good" },
  { value: 3, label: "Average" },
  { value: 2, label: "Poor" },
  { value: 0, label: "Terrible" },
];

const ReviewForm = ({ movie }) => {
  const { addReview } = useContext(MoviesContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      author: "",
      review: "",
      rating: 3,
    },
  });

  const onSubmit = (review) => {
    addReview(movie, {
        ...review,
        movieId: movie.id,
    });

    setOpen(true);
  };

    const handleSnackClose = () => {
        setOpen(false);
        navigate("/movies/favorites");
    };

  return (
  <Box sx={{ marginTop: 2 }}>
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={handleSnackClose}
    >
      <MuiAlert
        severity="success"
        variant="filled"
        onClose={handleSnackClose}
      >
        <Typography variant="h6">
          Thank you for submitting a review
        </Typography>
      </MuiAlert>
    </Snackbar>

    <Typography variant="h3" component="h2">
      Write a review
    </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Controller
          name="author"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Author's name"
              required
              error={Boolean(errors.author)}
              helperText={errors.author?.message}
              sx={{ width: "40ch", maxWidth: "100%" }}
            />
          )}
        />

        <Controller
          name="review"
          control={control}
          rules={{
            required: "Review cannot be empty.",
            minLength: {
              value: 10,
              message: "Review is too short",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Review text"
              required
              multiline
              minRows={10}
              fullWidth
              error={Boolean(errors.review)}
              helperText={errors.review?.message}
            />
          )}
        />

        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Rating Select"
              helperText="Don't forget your rating"
              sx={{ minWidth: 200 }}
            >
              {ratings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>

          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewForm;