import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  Paper,
  InputLabel,
  FormControl,
  Rating
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useFilteredMovies } from "../Action/useFilterMovies";
import FilteredMovieList from "./filteredMoviesList";
import SortIcon from "@mui/icons-material/Sort";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";

export type FormValues = {
  quality?: string;
  minimum_rating?: number;
  query_term?: string;
  genre?: string[];
  sort_by?: string;
  order_by?: "asc" | "desc";
};

const qualities = ["480p", "720p", "1080p", "2160p"];
const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];
const sortOptions = [
  { label: "Title (A-Z)", value: "title" },
  { label: "Release Year", value: "year" },
  { label: "IMDb Rating", value: "rating" },
  { label: "Like Count", value: "like_count" },
  { label: "Date Added", value: "date_added" },
];

const menuStyles = {
  PaperProps: {
    sx: {
      backgroundColor: "#1c1c1c",
      color: "#fff",
      "& .MuiMenuItem-root:hover": { backgroundColor: "#333" },
      "& .Mui-selected": {
        backgroundColor: "#e50914 !important",
        color: "#fff",
      },
    },
  },
};

const FilterMovies = () => {
  const { register, handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      order_by: "desc",
      sort_by: "",
    },
  });

  const {
    movies,
    isLoading,
    currentPage,
    totalPages,
    fetchFilteredMovies,
    onPageChange,
  } = useFilteredMovies();

  const [filters, setFilters] = useState<FormValues>({});
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [hoverRating, setHoverRating] = useState<number>(-1);

  const watchedSortBy = watch("sort_by");
  const watchedOrderBy = watch("order_by");

  useEffect(() => {
    const formattedFilters = {
      ...filters,
      genre: filters.genre?.join(",") || undefined,
      sort_by: watchedSortBy || undefined,
      order_by: watchedOrderBy || undefined,
      page: currentPage,
    };
    fetchFilteredMovies(formattedFilters);
  }, [filters, currentPage, watchedSortBy, watchedOrderBy, fetchFilteredMovies]);

  const onSubmit = (data: FormValues) => {
    setFilters({
      ...data,
      genre: Array.isArray(data.genre)
        ? data.genre
        : typeof data.genre === "string"
        ? [data.genre]
        : [],
    });
  };

 
  return (
    <Box sx={{ mt: 6, px: { xs: 2, sm: 3 } }}>
      <Paper
        elevation={10}
        sx={{
          backgroundColor: "#141414",
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
          maxWidth: { xs: "100%", sm: 800 },
          mx: "auto",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#e50914",
            fontWeight: "bold",
            textAlign: "center",
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: "1.8rem", sm: "2.125rem" },
          }}
        >
          🎬 Filter Movies
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={{ xs: 2, sm: 3 }}>
            <TextField
              label="Search"
              {...register("query_term")}
              variant="filled"
              fullWidth
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "#aaa" } }}
              sx={{ backgroundColor: "#222", borderRadius: 1 }}
            />

            <FormControl variant="filled" fullWidth>
              <InputLabel sx={{ color: "#aaa" }}>Quality</InputLabel>
              <Select
                defaultValue=""
                {...register("quality")}
                sx={{
                  backgroundColor: "#222",
                  color: "white",
                  borderRadius: 1,
                }}
                MenuProps={menuStyles}
              >
                <MenuItem value="">All Qualities</MenuItem>
                {qualities.map((q) => (
                  <MenuItem key={q} value={q}>
                    {q}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="filled" fullWidth>
              <InputLabel sx={{ color: "#aaa" }}>Genres</InputLabel>
              <Select
                multiple
                defaultValue={[]}
                {...register("genre")}
                sx={{
                  backgroundColor: "#222",
                  color: "white",
                  borderRadius: 1,
                }}
                MenuProps={menuStyles}
              >
                {genres.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              <Typography sx={{ color: "#aaa", mb: 1 }}>
                Minimum IMDb Rating
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                flexWrap="wrap"
                sx={{ gap: { xs: 1, sm: 2 } }}
              >
                <Controller
                  name="minimum_rating"
                  control={control}
                  render={({ field }) => (
                    <Rating
                      {...field}
                      max={9}
                      precision={1}
                      value={ratingValue || 0}
                      onChange={(_, newValue) => {
                        setRatingValue(newValue);
                        field.onChange(newValue);
                      }}
                      onChangeActive={(_, newHover) => setHoverRating(newHover)}
                      sx={{
                        color: "#FFD700",
                        "& .MuiRating-iconEmpty": { color: "#555" },
                      }}
                    />
                  )}
                />
                <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                  {hoverRating !== -1
                    ? `${hoverRating}/10`
                    : `${ratingValue || 0}/10`}
                </Typography>
              </Stack>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 3 }}
              sx={{ gap: { xs: 2, sm: 3 } }}
            >
              <FormControl variant="filled" fullWidth>
                <InputLabel sx={{ color: "#aaa" }}>
                  <SortIcon fontSize="small" sx={{ mr: 1 }} />
                  Sort By
                </InputLabel>
                <Select
                  defaultValue=""
                  {...register("sort_by")}
                  sx={{
                    backgroundColor: "#222",
                    color: "white",
                    borderRadius: 1,
                  }}
                  MenuProps={menuStyles}
                >
                  <MenuItem value="">Default</MenuItem>
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="filled" fullWidth>
                <InputLabel sx={{ color: "#aaa" }}>
                  <ArrowDownwardIcon fontSize="small" sx={{ mr: 1 }} />
                  Direction
                </InputLabel>
                <Select
                  defaultValue="desc"
                  {...register("order_by")}
                  sx={{
                    backgroundColor: "#222",
                    color: "white",
                    borderRadius: 1,
                  }}
                  MenuProps={menuStyles}
                >
                  <MenuItem value="desc">
                    <ArrowDownwardIcon fontSize="small" sx={{ mr: 1 }} />
                    Descending
                  </MenuItem>
                  <MenuItem value="asc">
                    <ArrowUpwardIcon fontSize="small" sx={{ mr: 1 }} />
                    Ascending
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#e50914",
                color: "white",
                fontWeight: "bold",
                fontSize: { xs: "1rem", sm: "1.1rem" },
                py: { xs: 1.5, sm: 2 },
                "&:hover": { backgroundColor: "#f6121d" },
              }}
            >
              🔍 Search Movies
            </Button>
          </Stack>
        </form>
      </Paper>

      <FilteredMovieList
        movies={movies}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Box>
  );
};

export default FilterMovies;
