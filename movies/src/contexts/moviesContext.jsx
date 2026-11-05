import React, { useState, useEffect } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = ({ children }) => {
  const [mustWatch, setMustWatch] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("mustWatchMovieIds") ?? "[]"
      );

      return Array.isArray(saved)
        ? [...new Set(
            saved.filter(
              (id) => Number.isInteger(id) && id > 0
            )
          )]
        : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});

  const addToFavorites = (movie) => {
    setFavorites((previous) =>
      previous.includes(movie.id)
        ? previous
        : [...previous, movie.id]
    );
  };

  const removeFromFavorites = (movie) => {
    setFavorites((previous) =>
      previous.filter((id) => id !== movie.id)
    );
  };

  const addReview = (movie, review) => {
  setMyReviews((previous) => ({
    ...previous,
    [movie.id]: review,
  }));
};

  const addToMustWatch = (movie) => {
    setMustWatch((previous) =>
      previous.includes(movie.id)
        ? previous
        : [...previous, movie.id]
    );
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch((previous) =>
      previous.filter((id) => id !== movie.id)
    );
  };

  const clearMustWatch = () => {
    setMustWatch([]);
  };

  useEffect(() => {
    localStorage.setItem(
      "mustWatchMovieIds",
      JSON.stringify(mustWatch)
    );

    console.log("Must Watch movie IDs:", mustWatch);
  }, [mustWatch]);

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        myReviews,
        addReview,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
        clearMustWatch
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;