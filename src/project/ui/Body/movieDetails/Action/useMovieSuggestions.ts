import { useState, useEffect } from "react";
import { getMovieSuggestions } from "../Request/getMovieSuggestions"; 
import type { Movie } from "../../movieList/Request/getMovies"; 

export const useSuggestions = (movieId: number) => {
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    if (!movieId) return;

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const suggestedMovies = await getMovieSuggestions(movieId);
        if (suggestedMovies) {
          setSuggestions(suggestedMovies);
        } else {
          setSuggestions([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [movieId]);

  return { suggestions, isLoading };
};
