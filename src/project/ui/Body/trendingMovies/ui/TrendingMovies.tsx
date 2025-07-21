import {  useEffect } from "react";
import { useTrendingMovies } from "../Action/useTrendingMovies";
import { Box, Typography } from "@mui/material";
import MovieCard from "../../movieCard/ui/MovieCard";
import MovieIcon from "@mui/icons-material/Movie";



const Trendingmovies: React.FC = () => {

  const { trendingmovies, isLoading } = useTrendingMovies();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []); // when change page number drag screen back to the top of the page

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
        Trending Movies🔥
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "30px",
        }}
      >
        {trendingmovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
     

    </Box>
    
  );
};

export default Trendingmovies;
