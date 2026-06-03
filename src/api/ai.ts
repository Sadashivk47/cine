import axios from "axios";
import { Movie } from "../types/movie";

export interface MoodMatcherResponse {
  suggestedMovie: Movie;
  aiExplanation: string;
  isKeyLeaked?: boolean;
  apiError?: string;
}

export const getMovieSuggestionFromMood = async (mood: string): Promise<MoodMatcherResponse> => {
  try {
    const response = await axios.post<MoodMatcherResponse>("/api/mood-matcher", { mood });
    return response.data;
  } catch (error) {
    throw new Error("connection temporarily offline. Please try again.");
  }
};
