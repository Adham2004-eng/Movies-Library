import axios from "axios";

export interface Movie {
  id: number;
  title: string;
 description_full: string;
  medium_cover_image: string;
  large_cover_image: string;
  small_cover_image: string;
  background_image: string;
  rating: number;
  year: number;
  genres: string[];
}

export const getMovies = async (
  page: number = 1,
  limit: number = 49
): Promise<Movie[]> => {
  try {
    const response = await axios.get("https://yts.mx/api/v2/list_movies.json", {
      params: {
        limit,
        page,
      },
    });
    const movies = response.data.data.movies;
    return movies || [];
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};
