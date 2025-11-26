import { Routes, Route } from "react-router-dom";
import Navbar from "./project/ui/Header/NavbarUi/AppBar";
import MovieList from "./project/ui/Body/movieList/ui/MovieList";
import MovieDetails from "./project/ui/Body/movieDetails/ui/MovieDetails";
import Trendingmovies from "./project/ui/Body/trendingMovies/ui/TrendingMovies";
import HighestRated from "./project/ui/Body/imdb/ui/HighestRated";
import FilterMovies from "./project/ui/Body/Filtermovies/ui/filterMovies";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/trendingmovies" element={<Trendingmovies />} />
        <Route path="/HighestRated" element={<HighestRated />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/filtermovies" element={<FilterMovies />} />
      </Routes>
    </>
  );
}

export default App;
