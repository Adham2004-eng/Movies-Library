import { useEffect, useState, useCallback } from "react";
import { getHighestRated } from "../Request/getHighestRated";
import type { Movie } from "../../movieList/Request/getMovies";

export const useHighestRated = (limit: number = 49) => {
  const [highestRated, setHighestRated] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = useCallback(async () => {
    try {
      const data = await getHighestRated( limit);
      setHighestRated(data);
    } finally {
      setIsLoading(false);
    }
  }, [ limit]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { highestRated, isLoading };
};
