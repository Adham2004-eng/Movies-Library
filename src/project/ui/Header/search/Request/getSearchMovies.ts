import axios from "axios";

const API_KEY = "cd4a748df1031e450c62da024b82b4cf"; // TMDB API Key

export interface SearchResultMovie {
  id: number;
  title: string;
  medium_cover_image: string;
}

export const getSearchMovies = async (
  query: string
): Promise<SearchResultMovie[]> => {
  if (!query) return [];

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
          query,
          page: 1,
          include_adult: false,
        },
      }
    );

    const results = response.data.results || [];

    const movies: SearchResultMovie[] = results.map((m: any) => ({
      id: m.id,
      title: m.title || "Untitled",
      medium_cover_image: m.poster_path
        ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
        : "/fallback-poster.jpg",
    }));

    return movies;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching search movies:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    return [];
  }
};
