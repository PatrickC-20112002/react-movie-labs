import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);
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
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;