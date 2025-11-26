import { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  InputBase,
  alpha,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useSearchMovies } from "../Action/useSearchMovies";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { results, isLoading } = useSearchMovies(query);

  const theme = useTheme();

  const handleSelect = (id: number) => {
    setQuery("");
    navigate(`/movie/${id}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        bgcolor: alpha("#222", 0.6),
        px: 1.5,
        borderRadius: 1,
        width: { xs: "100%", sm: 300 },
        transition: "background-color 0.3s ease",
        "&:hover": {
          bgcolor: alpha("#222", 0.9),
        },
      }}
    >
      <SearchIcon
        sx={{
          color: "white",
          mr: 1,
          flexShrink: 0,
        }}
      />
      <InputBase
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        inputProps={{ "aria-label": "search movies" }}
        sx={{
          color: "white",
          width: "100%",
          fontSize: "1rem",
          px: 1,
          borderRadius: 1,
          border: "1px solid transparent",
          transition: "border-color 0.3s ease",
          "&:focus-within": {
            borderColor: "red",
            backgroundColor: alpha("#222", 0.9),
          },
        }}
      />

      {query && (
        <Box
          sx={{
            position: "absolute",
            top: "110%",
            left: 0,
            width: "100%",
            maxHeight: 300,
            bgcolor: "#1c1c1c",
            borderRadius: 2,
            overflowY: "auto",
            zIndex: theme.zIndex.modal,
            boxShadow: 3,
            mt: 1,
          }}
        >
          {isLoading ? (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <CircularProgress size={24} color="inherit" />
            </Box>
          ) : results.length > 0 ? (
            results.map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  gap: 1,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#333" },
                }}
                onClick={() => handleSelect(movie.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSelect(movie.id);
                }}
              >
                <img
                  src={movie.medium_cover_image}
                  alt={movie.title}
                  width={40}
                  style={{ borderRadius: 4 }}
                />
                <Typography sx={{ color: "white", fontSize: 14, flexShrink: 1 }}>
                  {movie.title}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography sx={{ color: "gray", p: 1, fontSize: 14 }}>
              No results found
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
