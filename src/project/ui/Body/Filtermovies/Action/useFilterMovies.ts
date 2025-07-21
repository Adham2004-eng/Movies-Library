import { useState, useCallback } from "react";
import { getFilteredMovies } from "../Request/getFilterMovies";
import type { FilterOptions, FilteredMovie } from "../Request/getFilterMovies";

export const useFilteredMovies = () => {
  const [movies, setMovies] = useState<FilteredMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchFilteredMovies = useCallback(async (filters: FilterOptions) => {
    try {
      setIsLoading(true);
      const result = await getFilteredMovies(filters);
      setMovies(result.movies);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Failed to fetch filtered movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalCount / 49); // 49 movies per page

  return {
    movies,
    isLoading,
    totalCount,
    totalPages,
    currentPage,
    onPageChange,
    fetchFilteredMovies,
  };
};
