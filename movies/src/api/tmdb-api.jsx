export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(
            error.status_message || "Something went wrong"
          );
        });
      }

      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;

  const { id } = idPart;

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(
            error.status_message || "Something went wrong"
          );
        });
      }

      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US"
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(
            error.status_message || "Something went wrong"
          );
        });
      }

      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;

  const { id } = idPart;

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(
            error.status_message || "Something went wrong"
          );
        });
      }

      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;

  const { id } = idPart;

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(
            error.status_message || "Something went wrong"
          );
        });
      }

      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((res) => res.json())
    .then((json) => json.results);
};

export const getPopularMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return response.json();
};

export const getTopRatedMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top rated movies");
  }

  return response.json();
};

export const getNowPlayingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch now playing movies");
  }

  return response.json();
};

export const getMovieCredits = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie credits");
  }

  return response.json();
};

export const getPersonDetails = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  const response = await fetch(
    `https://api.themoviedb.org/3/person/${encodeURIComponent(id)}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch actor details");
  }

  return response.json();
};

export const getPersonMovieCredits = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  const response = await fetch(
    `https://api.themoviedb.org/3/person/${encodeURIComponent(id)}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch actor filmography");
  }

  return response.json();
};