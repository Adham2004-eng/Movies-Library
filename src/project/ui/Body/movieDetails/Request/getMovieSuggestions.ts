import axios from "axios";
import type { Movie } from "../../movieList/Request/getMovies";

export const getMovieSuggestions = async (
  movieId: number
): Promise<Movie[] | null> => {
  try {
    const response = await axios.get("https://yts.mx/api/v2/movie_suggestions.json", {
      params: {
        movie_id: movieId,
      },
    });

    console.log("Suggestions from API:", response.data.data.movies);

    const suggestions = response.data.data.movies;
    return suggestions || null;
  } catch (error) {
    console.error("Failed to fetch movie suggestions:", error);
    return null;
  }
};
