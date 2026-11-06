import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import Spinner from "../spinner";

const MovieReviews = ({ movie, onClose }) => {
  const {
    data,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["reviews", { id: movie.id }],
    queryFn: getMovieReviews,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        {error.message}
      </Typography>
    );
  }

  const reviews = data.results ?? [];

  if (reviews.length === 0) {
    return (
      <Typography
        color="text.secondary"
        sx={{ p: 3 }}
      >
        No reviews available for this movie.
      </Typography>
    );
  }

  return (
    <TableContainer>
      <Table
        size="small"
        aria-label="movie reviews"
        sx={{
          width: "100%",
          tableLayout: "fixed",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                width: "25%",
                fontWeight: "bold",
              }}
            >
              Author
            </TableCell>

            <TableCell
              sx={{
                width: "55%",
                fontWeight: "bold",
              }}
            >
              Excerpt
            </TableCell>

            <TableCell
              sx={{
                width: "20%",
                fontWeight: "bold",
              }}
            >
              More
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reviews.map((review) => (
            <TableRow
              key={review.id}
              hover
            >
              <TableCell
                sx={{
                  verticalAlign: "top",
                  py: 2,
                  overflowWrap: "anywhere",
                }}
              >
                {review.author || "Anonymous"}
              </TableCell>

              <TableCell
                sx={{
                  verticalAlign: "top",
                  py: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    overflowWrap: "anywhere",
                    lineHeight: 1.6,
                  }}
                >
                  {excerpt(review.content ?? "")}
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  verticalAlign: "top",
                  py: 2,
                  overflowWrap: "anywhere",
                }}
              >
                <Box
                  component={Link}
                  to={`/reviews/${review.id}`}
                  state={{
                    review,
                    movie,
                  }}
                  onClick={onClose}
                  sx={{
                    color: "primary.main",
                    fontSize: "0.875rem",
                  }}
                >
                  Full Review
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieReviews;
