import React from "react";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import { Movie } from "../types/movie";
import { AnimatePresence } from "motion/react";

interface AppRoutesProps {
  activeTab: "discover" | "favorites";
  onTabChange: (tab: "discover" | "favorites") => void;
  favorites: Movie[];
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
  watchlist: Movie[];
  onWatchTrailer: (movie: Movie) => void;
  onClearAllFavorites: () => void;
  isTMDBActive: boolean;
  setIsTMDBActive: (active: boolean) => void;
}

export default function AppRoutes({
  activeTab,
  onTabChange,
  favorites,
  onFavoriteToggle,
  onWatchlistToggle,
  watchlist,
  onWatchTrailer,
  onClearAllFavorites,
  isTMDBActive,
  setIsTMDBActive
}: AppRoutesProps) {
  return (
    <AnimatePresence mode="wait">
      {activeTab === "favorites" ? (
        <Favorites
          key="favorites-page"
          favorites={favorites}
          onFavoriteToggle={onFavoriteToggle}
          onWatchlistToggle={onWatchlistToggle}
          watchlist={watchlist}
          onWatchTrailer={onWatchTrailer}
          onNavigateHome={() => onTabChange("discover")}
          onClearAll={onClearAllFavorites}
        />
      ) : (
        <Home
          key="discover-page"
          favorites={favorites}
          onFavoriteToggle={onFavoriteToggle}
          onWatchlistToggle={onWatchlistToggle}
          watchlist={watchlist}
          onWatchTrailer={onWatchTrailer}
          isTMDBActive={isTMDBActive}
          setIsTMDBActive={setIsTMDBActive}
        />
      )}
    </AnimatePresence>
  );
}
