import axios from "axios";
import type { Movie } from "../../movieList/Request/getMovies";

export interface CastMember {
  name: string;
  character_name: string;
  url_small_image: string;
}

export interface Torrent {
  url: string;
  quality: string;
  type: string;
  size: string;
  seeds: number;
  peers: number;
}

export interface MovieDetails extends Movie {
  runtime: number;
  language: string;
  like_count: number;
  yt_trailer_code: string;
  description_full: string;
  cast: CastMember[];
  medium_cover_image: string;
  medium_screenshot_image1: string;
  medium_screenshot_image2: string;
  medium_screenshot_image3: string;
  torrents: Torrent[];
}

const API_KEY = "cd4a748df1031e450c62da024b82b4cf";

export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails | null> => {
  try {
    // 1) Movie details
    const details = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: API_KEY,
          append_to_response: "videos,images,credits",
          language: "en-US",
        },
      }
    );

    const data = details.data;

    // 🔹 Get trailer
    const trailer = data.videos?.results?.find(
      (v: any) => v.type === "Trailer" && v.site === "YouTube"
    );

    // 🔹 Convert cast
    const cast: CastMember[] = data.credits.cast.slice(0, 10).map((c: any) => ({
      name: c.name,
      character_name: c.character,
      url_small_image: c.profile_path
        ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
        : "",
    }));

    // 🔹 Screenshots (from TMDB backdrops)
    const screenshots = data.images.backdrops.slice(0, 3);
    
    const movieDetails: MovieDetails = {
      id: data.id,
      title: data.title,
      description_full: data.overview,
      medium_cover_image: data.poster_path
        ? `https://image.tmdb.org/t/p/w342${data.poster_path}`
        : "",
      large_cover_image: data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : "",
      small_cover_image: data.poster_path
        ? `https://image.tmdb.org/t/p/w200${data.poster_path}`
        : "",
      background_image: data.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${data.backdrop_path}`
        : "",
      rating: data.vote_average,
      year: data.release_date ? parseInt(data.release_date.slice(0, 4)) : 0,
      genres: data.genres.map((g: any) => g.name),

      // Extra details
      runtime: data.runtime,
      language: data.original_language,
      like_count: data.vote_count,
      yt_trailer_code: trailer ? trailer.key : "",
      cast,

      // screenshots (fallbacks if less than 3)
      medium_screenshot_image1: screenshots[0]
        ? `https://image.tmdb.org/t/p/w780${screenshots[0].file_path}`
        : "",
      medium_screenshot_image2: screenshots[1]
        ? `https://image.tmdb.org/t/p/w780${screenshots[1].file_path}`
        : "",
      medium_screenshot_image3: screenshots[2]
        ? `https://image.tmdb.org/t/p/w780${screenshots[2].file_path}`
        : "",

      // TMDB does NOT have torrents → return empty
      torrents: [],
    };

    return movieDetails;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    return null;
  }
};
