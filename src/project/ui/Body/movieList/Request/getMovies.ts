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

const API_KEY = "cd4a748df1031e450c62da024b82b4cf";

export const getMovies = async (
  page: number = 1,
  _limit: number = 49
): Promise<Movie[]> => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page,
        },
      }
    );

    const movies = response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      description_full: movie.overview,
      medium_cover_image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : "/no-image.jpg",
      large_cover_image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/no-image.jpg",
      small_cover_image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : "/no-image.jpg",
      background_image: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
        : movie.poster_path
        ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
        : "/no-bg.jpg",
      rating: movie.vote_average,
      year: movie.release_date ? parseInt(movie.release_date.slice(0, 4)) : 0,
      genres: [], // optional: TMDB has a genre_ids array if you need
    }));

    return movies;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};
