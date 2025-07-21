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

export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails | null> => {
  try {
    const response = await axios.get("https://yts.mx/api/v2/movie_details.json", {
      params: {
        movie_id: movieId,
        with_cast: true,
        with_images: true,
      },
    });

    const movie: MovieDetails = response.data.data.movie;

    return movie || null;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    return null;
  }
};
