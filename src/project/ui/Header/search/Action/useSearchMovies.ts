import { useCallback, useEffect, useMemo, useState } from "react";
import { getSearchMovies } from "../Request/getSearchMovies";
import type { SearchResultMovie } from "../Request/getSearchMovies";

export const useSearchMovies = (query: string) => {
  const [results, setResults] = useState<SearchResultMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const movies = await getSearchMovies(query);
      setResults(movies);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMovies();
    }, 500); 

    return () => clearTimeout(timeoutId); 
  }, [fetchMovies]);

  return { results: useMemo(() => results, [results]), isLoading };
};
