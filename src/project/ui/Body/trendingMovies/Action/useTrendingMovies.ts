import { useEffect, useState, useCallback } from "react";
import { getTrendingMovies } from "../Request/getTrendingMovies";
import type { Movie } from "../../movieList/Request/getMovies";

export const useTrendingMovies = (limit: number = 28) => {
  const [trendingmovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = useCallback(async () => {
    try {
      const data = await getTrendingMovies( limit);
      setTrendingMovies(data);
    } finally {
      setIsLoading(false);
    }
  }, [ limit]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { trendingmovies, isLoading };
};
