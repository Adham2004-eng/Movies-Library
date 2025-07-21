import axios from "axios";

export interface SearchResultMovie {
  id: number;
  title: string;
  medium_cover_image: string;
}

interface YTSMovieAPIResponse {
  data: {
    movies: {
      id: number;
      title: string;
      medium_cover_image: string;
    }[];
  };
}

export const getSearchMovies = async (
  query: string
): Promise<SearchResultMovie[]> => {
  try {
    const response = await axios.get<YTSMovieAPIResponse>(
      "https://yts.mx/api/v2/list_movies.json",
      {
        params: {
          query_term: query,
          limit: 20,
        },
      }
    );

    const movies = response.data.data.movies || [];
    return movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      medium_cover_image: movie.medium_cover_image,
    }));
  } catch (error) {
    console.error("Error fetching search movies:", error);
    return [];
  }
};
