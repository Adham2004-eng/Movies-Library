import { useEffect, useState, useCallback } from "react";
import { getMovieDetails } from "../Request/getMoviesDetails";
import type { MovieDetails } from "../Request/getMoviesDetails";

export const useMovieDetails = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetails = useCallback(async () => {
    setIsLoading(true);
    const data = await getMovieDetails(movieId);
    setMovie(data);
    setIsLoading(false);
  }, [movieId]);

  useEffect(() => {
    fetchDetails();
    window.scrollTo(0, 0);
  }, [fetchDetails]);

  return {
    movie,
    isLoading,
    hasTrailer: !!movie?.yt_trailer_code,
    cast: movie?.cast || [],
    trailerUrl: movie?.yt_trailer_code
      ? `https://www.youtube.com/watch?v=${movie.yt_trailer_code}`
      : null,
  };
};
