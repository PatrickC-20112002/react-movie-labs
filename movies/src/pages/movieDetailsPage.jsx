import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const MoviePage = () => {
  const { id } = useParams();

  const {
    data: movie,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["movie", { id: id }],
    queryFn: getMovie,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;