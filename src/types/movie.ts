export interface Movie {
  id: string;
  title: string;
  year: number;
  type: 'movie' | 'tv';
  duration?: string; // e.g. "2h 15m"
  episodes?: string; // e.g. "S2 • 12 Episodes"
  genres: string[];
  rating: number; // e.g. 4.9
  description: string;
  posterUrl: string;
  bgUrl?: string; // high-quality landscape image for featured views
  isFeatured?: boolean;
  isAIConcept?: boolean; // if generated/suggested by AI
}
