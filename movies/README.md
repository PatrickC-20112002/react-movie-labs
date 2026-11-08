# React Movies App

## Features

- Popular, Top Rated, Now Playing and Upcoming movies
- Movie details, reviews, cast, crew and recommendations
- Actor profiles with searchable and sortable filmographies
- Advanced movie filtering, sorting and pagination
- Catalogue-wide movie search
- Persistent Favourites and Must Watch lists
- Personal movie reviews
- Updated Material UI layouts and navigation

## TMDB API Integration

**Additional static endpoints:**
- `/movie/popular`
- `/movie/top_rated`
- `/movie/now_playing`

**Additional parameterised endpoints:**
- `/movie/{id}/credits`
- `/movie/{id}/recommendations`
- `/person/{id}`
- `/person/{id}/movie_credits`

Other endpoints support movie discovery, searching, reviews and images.

API functions: `src/api/tmdb-api.jsx`

## React Query and Local Storage

React Query handles API requests, caching, loading and errors.

React Context manages Favourites, Must Watch and personal reviews. These are saved using localStorage so they remain available after refreshing.

## Technologies

React, Vite, React Router, React Query, Material UI, React Hook Form, JavaScript and TMDB API.

## Running the Application

1. Clone the repository.
2. Open the `movies` directory.
3. Run `npm ci`.
4. Create a `.env` file containing `VITE_TMDB_KEY=your_api_key`.
5. Run `npm run dev`.

Open `http://localhost:5173`.

**Other commands:**
- `npm run lint` - Check code
- `npm run build` - Production build

Movie data provided by TMDB. This application is not endorsed or certified by TMDB.