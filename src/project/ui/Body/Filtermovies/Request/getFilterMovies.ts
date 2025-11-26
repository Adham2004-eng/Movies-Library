import axios from "axios";

const API_KEY = "cd4a748df1031e450c62da024b82b4cf"; // TMDB API Key

export interface FilterOptions {
  limit?: number;
  page?: number;
  query_term?: string;
  genre?: string[]; // frontend sends names like ["Action", "Comedy"]
  minimum_rating?: number; // TMDB: vote_average.gte
  sort_by?: string; // frontend values: rating, year, title, popularity, date_added
  order_by?: "asc" | "desc";
}

export interface FilteredMovie {
  id: number;
  title: string;
  year: number;
  rating: number;
  medium_cover_image: string;
  genres?: string[];
}

interface TMDBGenre {
  id: number;
  name: string;
}

const GENRE_LIST: TMDBGenre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
  // Add more if needed
];

export const getFilteredMovies = async (
  filters: FilterOptions
): Promise<{ movies: FilteredMovie[]; totalCount: number }> => {
  try {
    const page = filters.page || 1;
    const limit = filters.limit || 49;

    const params: any = {
      api_key: API_KEY,
      language: "en-US",
      page,
      include_adult: false,
    };

    // Handle search
    let endpoint = "https://api.themoviedb.org/3/discover/movie";
    if (filters.query_term) {
      endpoint = "https://api.themoviedb.org/3/search/movie";
      params.query = filters.query_term;
    } else {
      // Genre mapping: convert names to TMDB IDs
      if (filters.genre && filters.genre.length > 0) {
        const genreIds = GENRE_LIST.filter((g) =>
          filters.genre!.includes(g.name)
        ).map((g) => g.id);
        if (genreIds.length > 0) params.with_genres = genreIds.join(",");
      }

      // Minimum rating
      if (filters.minimum_rating) {
        params["vote_average.gte"] = filters.minimum_rating;
      }

      // Sorting
      if (filters.sort_by) {
        const order = filters.order_by === "asc" ? ".asc" : ".desc";
        const sortMap: Record<string, string> = {
          rating: "vote_average",
          year: "release_date",
          title: "original_title",
          popularity: "popularity",
          date_added: "primary_release_date",
        };
        const tmdbSort = sortMap[filters.sort_by] || "popularity";
        params.sort_by = tmdbSort + order;
      }
    }

    const response = await axios.get(endpoint, { params });
    const results = response.data.results || [];

    const movies: FilteredMovie[] = results.slice(0, limit).map((m: any) => ({
      id: m.id,
      title: m.title || "Untitled",
      year: m.release_date ? parseInt(m.release_date.slice(0, 4)) : 0,
      rating: m.vote_average || 0,
      medium_cover_image: m.poster_path
        ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
        : "/fallback-poster.jpg",
      genres: m.genre_ids
        ? GENRE_LIST.filter((g) => m.genre_ids.includes(g.id)).map(
            (g) => g.name
          )
        : [],
    }));

    return { movies, totalCount: response.data.total_results || 0 };
  } catch (error: any) {
    console.error(
      "Failed to fetch filtered movies:",
      error.response?.data || error.message
    );
    return { movies: [], totalCount: 0 };
  }
};
