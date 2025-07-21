import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Rating,
  Stack,
  CircularProgress,
  Pagination,
} from "@mui/material";
import type { FilteredMovie } from "../Request/getFilterMovies";
import { useNavigate } from "react-router-dom";

type Props = {
  movies: FilteredMovie[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const FilteredMovieList: React.FC<Props> = ({
  movies,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={3}
        mt={4}
        justifyContent="center"
      >
        {movies.map((movie) => (
          <Card
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            sx={{
              width: 250,
              height: 360,
              position: "relative",
              overflow: "hidden",
              borderRadius: 2,
              transition: "transform 0.3s ease",
              cursor: "pointer",
              backgroundColor: "transparent",
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
                  "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2))",
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
              <Typography fontSize={16} fontWeight="bold">
                {movie.title}
              </Typography>

              <Typography fontSize={14} color="gray" sx={{ mb: 0.5 }}>
                {movie.genres?.join(", ") || "Genre Unknown"}
              </Typography>

              <Typography fontSize={14}>
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

              <Typography fontSize={14}>
                <strong>Year:</strong> {movie.year}
              </Typography>
            </Box>
          </Card>
        ))}
      </Stack>

      {totalPages > 1 && (
        <Box mt={6} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
            size="large"
            shape="rounded"
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: "bold",
                borderRadius: "16px",
                marginX: "6px",
                padding: "10px 16px",
                backgroundColor: "#1e1e1e",
                color: "#fff",
                border: "1px solid #444",
                transition: "0.3s ease",
                "&:hover": {
                  backgroundColor: "#333",
                  color: "#ffcc00",
                  transform: "scale(1.1)",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#ffcc00 !important",
                color: "#000 !important",
                border: "1px solid #fff",
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default FilteredMovieList;
