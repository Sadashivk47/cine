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
  let url = `/api/movies?page=${page}`;
  if (genre !== "All") {
    url += `&genre=${encodeURIComponent(genre)}`;
  }
  if (type !== "all") {
    url += `&type=${type}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch popular movies from server.");
  }
  return res.json();
};

export const searchMovies = async (
  query: string,
  page: number,
  genre: string = "All",
  type: string = "all"
): Promise<FetchMoviesResponse> => {
  let url = `/api/movies?page=${page}`;
  if (query) {
    url += `&q=${encodeURIComponent(query)}`;
  }
  if (genre !== "All") {
    url += `&genre=${encodeURIComponent(genre)}`;
  }
  if (type !== "all") {
    url += `&type=${type}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to search movies from server.");
  }
  return res.json();
};

export const getFeaturedMovie = async (): Promise<Movie> => {
  const res = await fetch("/api/movies/featured");
  if (!res.ok) {
    throw new Error("Failed to fetch featured movie");
  }
  return res.json();
};
