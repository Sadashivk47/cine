import React from "react";
import { Heart, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

interface FavoritesProps {
  key?: React.Key | string | number;
  favorites: Movie[];
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
  watchlist: Movie[];
  onWatchTrailer: (movie: Movie) => void;
  onNavigateHome: () => void;
  onClearAll: () => void;
}

export default function Favorites({
  favorites,
  onFavoriteToggle,
  onWatchlistToggle,
  watchlist,
  onWatchTrailer,
  onNavigateHome,
  onClearAll
}: FavoritesProps) {
  return (
    <motion.div
      key="favorites-route"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="w-full px-2 sm:px-4 md:px-6 pt-36 sm:pt-44 pb-16"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-noir-800 pb-5 gap-4">
        <div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight flex items-center gap-3">
            <Heart className="w-8 h-8 text-crimson-500 fill-crimson-500" />
            My Favorites
          </h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base font-sans font-medium">
            Your personalized movie catalog with {favorites.length} saved titles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClearAll}
            className="px-3.5 py-2 text-xs font-bold rounded-lg border border-noir-800 hover:border-crimson-500/40 hover:text-crimson-400 transition bg-noir-900/40 text-gray-400 flex items-center gap-1 cursor-pointer"
            disabled={favorites.length === 0}
          >
            Clear All Favorites
          </button>
          <button
            onClick={onNavigateHome}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-crimson-500 hover:bg-crimson-400 text-white transition flex items-center gap-1.5 cursor-pointer"
          >
            Browse Directory
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-5 gap-y-8 mt-8">
          {favorites.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              isFavorite={true}
              onFavoriteToggle={onFavoriteToggle}
              onWatchlistToggle={onWatchlistToggle}
              isOnWatchlist={watchlist.some(w => w.id === m.id)}
              onWatchTrailer={onWatchTrailer}
            />
          ))}
        </div>
      ) : (
        <div className="w-full py-20 text-center border border-dashed border-noir-850 rounded-2xl flex flex-col items-center justify-center p-6 bg-noir-900/10 mt-8">
          <div className="w-16 h-16 rounded-full bg-noir-900 border border-noir-800 flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-gray-700" />
          </div>
          <h3 className="font-display font-extrabold text-xl text-white">Your catalog is currently empty</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mt-1 leading-relaxed">
            Start making the platform your own. Explore our curated catalog or use our AI Mood Matcher to discover and favorite things you love.
          </p>
          <button
            onClick={onNavigateHome}
            className="mt-6 px-5 py-3 rounded-xl bg-crimson-500 hover:bg-crimson-400 font-bold text-sm text-white transition cursor-pointer"
          >
            Discover Movies
          </button>
        </div>
      )}
    </motion.div>
  );
}
