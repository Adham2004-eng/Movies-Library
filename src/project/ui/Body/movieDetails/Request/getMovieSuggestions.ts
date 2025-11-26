import axios from "axios";
import type { Movie } from "../../movieList/Request/getMovies";

const API_KEY = "cd4a748df1031e450c62da024b82b4cf";

export const getMovieSuggestions = async (
  movieId: number
): Promise<Movie[] | null> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/similar`,
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      }
    );

    const results = response.data.results;

    console.log("TMDB Suggestions:", results);

    // Convert TMDB structure to your Movie interface
    const suggestions: Movie[] = results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      description_full: movie.overview,
      medium_cover_image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : "",
      large_cover_image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
      small_cover_image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : "",
      background_image: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
        : "",
      rating: movie.vote_average,
      year: movie.release_date ? parseInt(movie.release_date.slice(0, 4)) : 0,
      genres: [], // You can fill this later if needed
    }));

    return suggestions;
  } catch (error) {
    console.error("Failed to fetch movie suggestions:", error);
    return null;
  }
};
