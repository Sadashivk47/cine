import axios from "axios";
import { Movie } from "../types/movie";

export interface FetchMoviesResponse {
  movies: Movie[];
  hasMore: boolean;
  isTMDB: boolean;
}

export const getPopularMovies = async (
  page: number,
  genre: string = "All",
  type: string = "all"
): Promise<FetchMoviesResponse> => {
  const params: Record<string, any> = { page };
  if (genre !== "All") {
    params.genre = genre;
  }
  if (type !== "all") {
    params.type = type;
  }
  const response = await axios.get<FetchMoviesResponse>("/api/movies", { params });
  return response.data;
};

export const searchMovies = async (
  query: string,
  page: number,
  genre: string = "All",
  type: string = "all"
): Promise<FetchMoviesResponse> => {
  const params: Record<string, any> = { page };
  if (query) {
    params.q = query;
  }
  if (genre !== "All") {
    params.genre = genre;
  }
  if (type !== "all") {
    params.type = type;
  }
  const response = await axios.get<FetchMoviesResponse>("/api/movies", { params });
  return response.data;
};

export const getFeaturedMovie = async (): Promise<Movie> => {
  const response = await axios.get<Movie>("/api/movies/featured");
  return response.data;
};
