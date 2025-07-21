import axios from "axios";

export interface FilterOptions {
  limit?: number;
  page?: number;
  quality?: string;
  minimum_rating?: number;
  query_term?: string;
  genre?: string;
  sort_by?: string;
  order_by?: "asc" | "desc";
  with_rt_ratings?: boolean;
}

export interface FilteredMovie {
  id: number;
  title: string;
  year: number;
  rating: number;
  medium_cover_image: string;
  genres?: string[];
}

interface YTSResponse {
  data: {
    movie_count: number;
    movies: FilteredMovie[];
  };
}

export const getFilteredMovies = async (
  filters: FilterOptions
): Promise<{ movies: FilteredMovie[]; totalCount: number }> => {
  try {
    const { data } = await axios.get<YTSResponse>("https://yts.mx/api/v2/list_movies.json", {
      params: {
        ...filters,
        limit: filters.limit || 49, 
      },
    });

    return {
      movies: data.data.movies || [],
      totalCount: data.data.movie_count || 0,
    };
  } catch (error) {
    console.error("Failed to fetch filtered movies:", error);
    return { movies: [], totalCount: 0 };
  }
};
