import { useEffect, useState, useCallback } from "react";
import { getMovies } from "../Request/getMovies";
import type { Movie } from "../Request/getMovies";

export const useMovies = (page: number = 1, limit: number = 49) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = useCallback(async () => {
    try {
      const data = await getMovies(page, limit);
      setMovies(data);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, isLoading };
};
