import axios from "axios";
import type { Movie } from "../../movieList/Request/getMovies";


export const getTrendingMovies = async (
  limit: number = 29
): Promise<Movie[]> => {
  try {
    const response = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=year&order_by=desc", {
      params: {
        limit
      },
    });
    const movies = response.data.data.movies;
    return movies || [];
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};
