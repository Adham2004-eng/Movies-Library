import { useState, useEffect } from "react";
import { useMovies } from "../Action/useMovies";
import { Box, Typography, Button } from "@mui/material";
import MovieCard from "../../movieCard/ui/MovieCard";
import MovieIcon from "@mui/icons-material/Movie";

const TOTAL_PAGES = 30; 

const MovieList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { movies, isLoading } = useMovies(page);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]); // when change page number drag screen back to the top of the page

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#141414",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <MovieIcon sx={{ fontSize: 60, color: "gray" }} />
        <Typography variant="h5" color="gray">
          Loading Movies...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#141414",
        color: "white",
        padding: "40px 60px",
        paddingTop: "100px",
      }}
    >

      
      <Typography
        variant="h4"
        mb={3}
        sx={{
          fontWeight: "bold",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
        }}
      >
        Movies
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "30px",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {[...Array(TOTAL_PAGES)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <Button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              sx={{
                minWidth: "40px",
                color: page === pageNum ? "white" : "gray",
                backgroundColor: page === pageNum ? "#1976d2" : "#1e1e1e",
                borderColor: "#333",
              }}
            >
              {pageNum}
            </Button>
          );
        })}
      </Box>

    </Box>
    
  );
};

export default MovieList;
