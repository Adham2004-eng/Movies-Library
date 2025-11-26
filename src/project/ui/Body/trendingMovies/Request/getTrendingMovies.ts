import axios from "axios";
import type { Movie } from "../../movieList/Request/getMovies";

const API_KEY = "cd4a748df1031e450c62da024b82b4cf"; // replace with your TMDB API key

export const getTrendingMovies = async (
  limit: number = 29
): Promise<Movie[]> => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week",
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      }
    );

    const results = response.data.results || [];

    // Map TMDB movie structure → your Movie interface
    const movies: Movie[] = results.slice(0, limit).map((m: any) => ({
      id: m.id,
      title: m.title || "Untitled",
      description_full: m.overview || "No description",
      medium_cover_image: m.poster_path
        ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
        : "/fallback-poster.jpg",
      large_cover_image: m.poster_path
        ? `https://image.tmdb.org/t/p/w780${m.poster_path}`
        : "/fallback-poster.jpg",
      small_cover_image: m.poster_path
        ? `https://image.tmdb.org/t/p/w185${m.poster_path}`
        : "/fallback-poster.jpg",
      background_image: m.backdrop_path
        ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
        : "/fallback-bg.jpg",
      rating: m.vote_average || 0,
      year: m.release_date ? parseInt(m.release_date.slice(0, 4)) : 0,
      genres: [], // optional: you can map genre_ids to names if needed
    }));

    return movies;
  } catch (error: any) {
    console.error(
      "Failed to fetch trending movies:",
      error.response?.data || error.message
    );
    return [];
  }
};
