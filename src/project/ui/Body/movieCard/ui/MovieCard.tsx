import React from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import type { Movie } from "../../movieList/Request/getMovies";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)}
      sx={{
        width: 250,
        height: 360,
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        transition: "transform 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.07)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.7)",
          zIndex: 10,
        },
        "&:hover .overlay": {
          opacity: 1,
        },
      }}
    >
      <CardMedia
        component="img"
        height="360"
        image={movie.medium_cover_image}
        alt={movie.title}
        sx={{ objectFit: "cover" }}
      />

      <Box
        className="overlay"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.9))",
          color: "white",
          opacity: 0,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Typography
          fontSize={16}
          fontWeight="bold"
          color="white"
          sx={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", mb: 0.5 }}
        >
          {movie.title}
        </Typography>

        <Typography
          fontSize={14}
          color="gray"
          sx={{ fontStyle: "italic", mb: 0.5 }}
        >
          {movie.genres?.join(", ")}
        </Typography>

        <Typography fontSize={14} color="white">
          <strong>Rating:</strong>
        </Typography>
        <Rating
          name="movie-rating"
          value={movie.rating / 2}
          precision={0.5}
          readOnly
          size="medium"
          sx={{
            "& .MuiRating-iconFilled": {
              color: "#FFD700",
            },
            "& .MuiRating-iconEmpty": {
              color: "white",
            },
          }}
        />
        <Typography fontSize={13} color="gray">
          ({movie.rating}/10)
        </Typography>
        <Typography fontSize={14} color="white">
          <strong>Year:</strong> {movie.year}
        </Typography>
      </Box>
    </Card>
  );
};

export default MovieCard;
