# React Movies App

## 1. Project Overview

This project extends the React Movies application from the practical labs using additional TMDB API endpoints and new features.
The application allows users to browse and search for movies, filter and sort results, view cast and crew information, explore person profiles and filmographies, and maintain personal movie lists and reviews.

## 2. Features

### Movie Browsing

The application includes additional movie categories:

- Popular Movies
- Top Rated Movies
- Now Playing
- Upcoming Movies

Each category retrieves data from TMDB and displays the movies using reusable cards.

### Explore and Search

The **Explore Movies** page uses TMDB's Discover endpoint to provide:

- Filtering by genre, release year and minimum rating
- Sorting by popularity, rating, release date and vote count
- Pagination for browsing large result sets
- A Reset Filters button

Filters and page numbers are stored in the URL, preserving the selected options when navigating back or refreshing.
The **Search Movies** page allows users to search the wider TMDB catalogue by title. It includes pagination and sorting by relevance, rating and release date.
Search sorting applies to the current page of results.

Implementation:
- `src/pages/exploreMoviesPage.jsx`
- `src/pages/searchMoviesPage.jsx`

### Movie Details

The Movie Details page displays the movie's poster, overview, genres, release information, runtime, revenue and rating.
Additional features include:

- Cast members and their characters
- Crew members and their roles
- Recommended movies
- TMDB user reviews in a scrollable dialog
- Additional movie posters
- Personal reviews submitted by the user

Cast and crew members link directly to their profiles, while recommended movies link to their own details pages.

Implementation:
- `src/components/movieDetails/`
- `src/components/movieCast/`
- `src/components/movieCrew/`
- `src/components/movieRecommendations/`

### Person Profiles

Individual person profiles display available biographical information and filmographies.
The filmography combines acting and crew credits. Users can search for movies by title, sort the results and load additional entries.
Selecting a movie in a person's filmography opens its Movie Details page. This provides navigation between movies, actors and crew members.

Implementation:
- `src/pages/personDetailsPage.jsx`

### Favourites and Must Watch

Favourites and Must Watch are separate movie lists.

Users can:
- Add and remove Favourite movies
- Save movies to Must Watch
- Remove individual Must Watch entries
- Clear the entire Must Watch list
- Add Must Watch movies to Favourites

Both lists are stored locally and remain available after refreshing the browser.

### Personal Reviews

Users can submit their own reviews for Favourite movies through a form with input validation.
Submitted reviews are saved in localStorage and displayed on the corresponding Movie Details page.
These are separate from TMDB user reviews and are not uploaded to TMDB.

Implementation:
- `src/components/reviewForm/`
- `src/contexts/moviesContext.jsx`

### Interface Improvements

The original application has also been improved using Material UI:

- Updated navigation with Browse and My Lists menus
- Responsive movie cards and page layouts
- Redesigned Movie Details and person profiles
- Search and filtering controls
- Pagination
- Review dialogs
- Loading indicators and error messages

## 3. TMDB API Integration

The application retrieves movie and person information from The Movie Database (TMDB) API.
API functions are defined in `src/api/tmdb-api.jsx`.

### Additional Static Endpoints

| Endpoint | Function |
| --- | --- |
| `/movie/popular` | Popular movies |
| `/movie/top_rated` | Top-rated movies |
| `/movie/now_playing` | Movies currently in cinemas |

### Additional Parameterised Endpoints

| Endpoint | Function |
| --- | --- |
| `/movie/{id}/credits` | Movie cast and crew |
| `/movie/{id}/recommendations` | Recommended movies |
| `/person/{id}` | Person details and biography |
| `/person/{id}/movie_credits` | Acting and crew filmography |

These parameterised endpoints are used to link related information.
For example, a user can open a movie, select an actor from its cast, view that actor's filmography, and navigate to another movie.

### Other Endpoints

The application also uses:

- `/discover/movie` - Movie discovery and filtering
- `/search/movie` - Movie title searching
- `/movie/upcoming` - Upcoming releases
- `/movie/{id}` - Movie details
- `/movie/{id}/reviews` - TMDB reviews
- `/movie/{id}/images` - Movie images
- `/genre/movie/list` - Genre information

TMDB API documentation:
https://developer.themoviedb.org/reference/intro/getting-started

## 4. React Query and Local Storage

### React Query

TanStack React Query manages TMDB API requests, caching, loading states and error handling.
Different query keys are used for individual movies, people, search queries and filter combinations.
For example, changing the selected genre or page on Explore creates a different query, allowing React Query to manage the corresponding results.
The QueryClient is configured in `src/main.jsx`, and API functions are located in `src/api/tmdb-api.jsx`.

### React Context and Local Storage

React Context manages the user's Favourites, Must Watch list and personal reviews.
The state is saved in browser localStorage using three keys:

| Key | Purpose |
| --- | --- |
| `favoriteMovieIds` | Saved Favourite movie IDs |
| `mustWatchMovieIds` | Saved Must Watch movie IDs |
| `myMovieReviews` | Submitted personal reviews |

The data is loaded when the application starts and saved whenever it changes.
This keeps personal lists and reviews available between browser sessions without requiring user accounts or a backend database.

Implementation:
- `src/contexts/moviesContext.jsx`

## 5. Technologies

| Technology | Purpose |
| --- | --- |
| React | Component-based UI |
| Vite | Development server and build tool |
| React Router | Navigation and URL parameters |
| TanStack React Query | Data fetching and caching |
| Material UI | Layout and interface components |
| React Hook Form | Review form validation |
| React Context | Shared application state |
| localStorage | Persistent personal data |
| TMDB API | Movie and person information |
| JavaScript / JSX | Application functionality |

## 6. Running the Application

### Requirements

- Node.js and npm
- TMDB API key
- Internet connection

### Setup

Clone the repository:

```bash
git clone https://github.com/PatrickC-20112002/react-movie-labs.git
```

Open the application directory:

```bash
cd react-movie-labs/movies
```

Install dependencies:

```bash
npm ci
```

Create a `.env` file in the `movies` directory containing:

```env
VITE_TMDB_KEY=your_tmdb_api_key_here
```

Replace the placeholder with your own TMDB API key. Do not commit your `.env` file.

Start the development server:

```bash
npm run dev
```

Open the local address shown by Vite, normally `http://localhost:5173`.

### Code Checks

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

The production files are generated in the `dist` directory.

### Notes

Favourites, Must Watch and personal reviews are stored in the current browser and are not synchronised between devices.
Movie information and images are provided by TMDB API.