import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetails } from "../Action/useMovieDetails";
import { useSuggestions } from "../Action/useMovieSuggestions";
import { Box, Typography, Chip, Stack, Divider, Rating } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { useMemo } from "react";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movieId = useMemo(() => parseInt(id || "0"), [id]);

  const { movie, isLoading } = useMovieDetails(movieId);
  const { suggestions, isLoading: isSuggestionsLoading } =
    useSuggestions(movieId);

  if (isLoading || !movie) {
    return (
      <Box sx={{ color: "white", textAlign: "center", mt: 10 }}>
        <MovieIcon sx={{ fontSize: 60, color: "gray" }} />
        <Typography variant="h5" color="gray">
          Loading Movies...
        </Typography>
      </Box>
    );
  }

  const screenshots = [
    movie.medium_screenshot_image1,
    movie.medium_screenshot_image2,
    movie.medium_screenshot_image3,
  ].filter(Boolean);

  const trailerUrl = movie.yt_trailer_code
    ? `https://www.youtube.com/embed/${movie.yt_trailer_code}`
    : null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "white",
        background: `linear-gradient(to right, rgba(10,10,10,0.95) 30%, rgba(10,10,10,0.85)), url(${movie.medium_cover_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: { xs: 2, md: 10 },
        py: { xs: 6, md: 10 },
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 6,
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <Box
          component="img"
          src={movie.medium_cover_image}
          alt={movie.title}
          sx={{
            width: { xs: "70%", sm: "300px" },
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.03)" },
          }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mb: 1, color: "#f5f5f5" }}
          >
            {movie.title}
          </Typography>

          <Typography variant="subtitle1" sx={{ color: "#bbbbbb", mb: 2 }}>
            {movie.year} • {movie.runtime} min • {movie.language?.toUpperCase()}
          </Typography>

          <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
            {movie.genres?.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                size="small"
                sx={{
                  fontWeight: 500,
                  fontSize: 13,
                  backgroundColor: "#ff1744",
                  color: "white",
                  mb: 1,
                }}
              />
            ))}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Typography fontSize={14} color="white">
              <strong>Rating:</strong>
            </Typography>
            <Rating
              name="movie-rating"
              value={movie.rating / 2}
              precision={0.5}
              readOnly
              sx={{
                "& .MuiRating-iconFilled": { color: "#FFD700" },
                "& .MuiRating-iconEmpty": { color: "white" },
              }}
            />
            <Typography fontSize={13} color="gray">
              ({movie.rating}/10)
            </Typography>
          </Stack>

          <Typography sx={{ fontSize: 16, mb: 1, color: "#ccc" }}>
            <strong>Likes:</strong> {movie.like_count}
          </Typography>

          {movie.torrents && movie.torrents.length > 0 && (
            <Stack direction="row" spacing={2} mb={2}>
              {movie.torrents.map((torrent, index) => (
                <Chip
                  key={index}
                  label={`${torrent.quality.toUpperCase()} • ${torrent.size}`}
                  sx={{
                    backgroundColor: "#222",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: "bold",
                    border: "1px solid #555",
                  }}
                />
              ))}
            </Stack>
          )}

          <Divider sx={{ my: 2, borderColor: "#444" }} />

          <Box
            sx={{
              maxHeight: 300,
              overflowY: "auto",
              pr: 1,
              color: "#ddd",
              fontSize: 15,
              lineHeight: 1.7,
              textAlign: "justify",
            }}
          >
            {movie.description_full}
          </Box>
        </Box>
      </Box>

      {trailerUrl && (
        <>
          <Divider sx={{ my: 4, borderColor: "#444" }} />
          <Typography variant="h5" gutterBottom>
            Trailer
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 500,
              height: 280,
              mt: 4,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
              title="YouTube trailer"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </Box>
        </>
      )}

      {screenshots.length > 0 && (
        <>
          <Divider sx={{ my: 4, borderColor: "#444" }} />
          <Typography variant="h5" color="white" gutterBottom>
            Screenshots
          </Typography>
          <Stack direction="row" spacing={2} sx={{ overflowX: "auto", py: 2 }}>
            {screenshots.map((url, idx) => (
              <Box
                key={idx}
                component="img"
                src={url}
                alt={`Screenshot ${idx + 1}`}
                sx={{
                  height: 200,
                  borderRadius: 2,
                  objectFit: "cover",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                }}
              />
            ))}
          </Stack>
        </>
      )}

      {movie.cast?.length > 0 && (
        <>
          <Divider sx={{ my: 4, borderColor: "#444" }} />
          <Typography variant="h5" color="white" gutterBottom>
            Cast
          </Typography>
          <Stack direction="row" spacing={2} sx={{ overflowX: "auto", py: 2 }}>
            {movie.cast.map((member, index) => (
              <Box
                key={index}
                sx={{
                  width: 120,
                  textAlign: "center",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={
                    member.url_small_image ||
                    "https://via.placeholder.com/120x180?text=No+Image"
                  }
                  alt={member.name}
                  sx={{
                    width: 100,
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 2,
                    mx: "auto",
                    mb: 1,
                  }}
                />
                <Typography fontSize={13} fontWeight="bold" noWrap>
                  {member.name}
                </Typography>
                <Typography fontSize={12} color="gray" noWrap>
                  as {member.character_name}
                </Typography>
              </Box>
            ))}
          </Stack>
        </>
      )}

      <Divider sx={{ my: 4, borderColor: "#444" }} />
      <Typography variant="h5" color="white" gutterBottom>
        Suggested Movies
      </Typography>

      {isSuggestionsLoading ? (
        <Typography color="gray">Loading suggestions...</Typography>
      ) : suggestions.length > 0 ? (
        <Stack direction="row" spacing={2} sx={{ overflowX: "auto", py: 2 }}>
          {suggestions.map((suggested) => (
            <Box
              key={suggested.id}
              sx={{
                width: 180,
                flexShrink: 0,
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
              onClick={() => navigate(`/movie/${suggested.id}`)}
            >
              <Box
                component="img"
                src={suggested.medium_cover_image}
                alt={suggested.title}
                sx={{
                  width: "100%",
                  height: 270,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
              <Typography
                variant="body2"
                color="white"
                noWrap
                sx={{ mt: 1, textAlign: "center" }}
              >
                {suggested.title}
              </Typography>
            </Box>
          ))}
        </Stack>
      ) : (
        <Typography color="gray">No suggestions available.</Typography>
      )}
    </Box>
  );
};

export default MovieDetails;
