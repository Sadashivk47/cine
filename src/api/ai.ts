import { Movie } from "../types/movie";

export interface MoodMatcherResponse {
  suggestedMovie: Movie;
  aiExplanation: string;
  isKeyLeaked?: boolean;
  apiError?: string;
}

export const getMovieSuggestionFromMood = async (mood: string): Promise<MoodMatcherResponse> => {
  const res = await fetch("/api/mood-matcher", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood })
  });
  
  if (!res.ok) {
    throw new Error("connection temporarily offline. Please try again.");
  }
  
  return res.json();
};
