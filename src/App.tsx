import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { Movie } from "./types/movie";
import { CURATED_MOVIES } from "./data";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const getMovieTrailerUrl = (movie: Movie): string => {
  const trailerMap: Record<string, string> = {
    'midnight-reckoning': 'u48_JpUloGY', // Accurate working trailer ID provided by user
    'neon-genesis-tokyo': 'gCcx85zly3I', // Blade Runner 2049
    'the-red-beyond': 'zSWdZAIB3nY', // Interstellar
    'midnight-jazz': 'mqqft22SCOL', // The Batman style
    'shadow-realm': 'U2Qp5pL38gY', // Dune Part Two
    'the-silent-echo': 'zSWdZAIB3nY', // Interstellar style
    'neon-nights': 'gCcx85zly3I',
    'shadow-protocol': 'mqqft22SCOL',
    'the-last-nebula': 'U2Qp5pL38gY',
    'noir-chronicles': 'mqqft22SCOL',
    'binary-horizon': 'gCcx85zly3I',
    'neon-requiem': 'gCcx85zly3I',
    'the-last-drive': 'mqqft22SCOL',
    'neon-district': 'gCcx85zly3I',
    'inner-space': 'zSWdZAIB3nY',
    'the-red-cabin': 'U2Qp5pL38gY',
    'room-404': 'mqqft22SCOL',
    'midnight-orbit': 'zSWdZAIB3nY',
    'neon-syndicate': 'gCcx85zly3I',
    'binary-pulse': 'gCcx85zly3I',
    'the-final-act': 'mqqft22SCOL',
    'horizon-bound': 'zSWdZAIB3nY',
    'urban-jungle-last-city': 'gCcx85zly3I',
    'kingdom-fall': 'U2Qp5pL38gY'
  };

  const mapped = movie.id ? trailerMap[movie.id] : null;
  if (mapped) {
    return `https://www.youtube.com/embed/${mapped}?autoplay=1&mute=0&rel=0&modestbranding=1`;
  }

  // Fallback to the premium, verified trailer to ensure it never says 'Video Unavailable'
  return `https://www.youtube.com/embed/u48_JpUloGY?autoplay=1&mute=0&rel=0&modestbranding=1`;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"discover" | "favorites">("discover");
  
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [videoOverlayUrl, setVideoOverlayUrl] = useState<string | null>(null);
  const [isTMDBActive, setIsTMDBActive] = useState<boolean>(false);

  useEffect(() => {
    setActiveTab("discover");
    try {
      if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
        window.history.replaceState(null, "", "/");
      }
      if (window.location.hash) {
        window.history.replaceState(null, "", "/");
      }
    } catch (e) {
      console.warn("Could not modify routing state history: ", e);
    }

    const handleNavigationSync = () => {
      if (window.location.pathname === "/favorites" || window.location.pathname.endsWith("/favorites") || window.location.hash === "#favorites") {
        setActiveTab("favorites");
      } else {
        setActiveTab("discover");
      }
    };

    window.addEventListener("popstate", handleNavigationSync);
    window.addEventListener("hashchange", handleNavigationSync);

    return () => {
      window.removeEventListener("popstate", handleNavigationSync);
      window.removeEventListener("hashchange", handleNavigationSync);
    };
  }, []);

  const handleTabTransition = (tab: "discover" | "favorites") => {
    setActiveTab(tab);
    if (tab === "favorites") {
      window.history.pushState(null, "", "/favorites");
    } else {
      window.history.pushState(null, "", "/");
    }
  };

  useEffect(() => {
    const storedFavsPayloads = localStorage.getItem("cinestream_favs_payloads");
    if (storedFavsPayloads) {
      try {
        setFavorites(JSON.parse(storedFavsPayloads));
      } catch (e) {
        console.error("Failed to parse favorites payloads", e);
      }
    } else {
      const legacyFavIds = localStorage.getItem("cinestream_favs");
      if (legacyFavIds) {
        try {
          const ids: string[] = JSON.parse(legacyFavIds);
          const matched = CURATED_MOVIES.filter(m => ids.includes(m.id));
          setFavorites(matched);
        } catch (e) {
          console.error("Failed to parse legacy fav ids", e);
        }
      }
    }

    const storedWatchlistPayloads = localStorage.getItem("cinestream_watchlist_payloads");
    if (storedWatchlistPayloads) {
      try {
        setWatchlist(JSON.parse(storedWatchlistPayloads));
      } catch (e) {
        console.error("Failed to parse watchlist payloads", e);
      }
    } else {
      const legacyWatchIds = localStorage.getItem("cinestream_watchlist");
      if (legacyWatchIds) {
        try {
          const ids: string[] = JSON.parse(legacyWatchIds);
          const matched = CURATED_MOVIES.filter(m => ids.includes(m.id));
          setWatchlist(matched);
        } catch (e) {
          console.error("Failed to parse legacy watch ids", e);
        }
      }
    }
  }, []);

  const toggleFavorite = (movie: Movie) => {
    let updated: Movie[];
    if (favorites.some(fav => fav.id === movie.id)) {
      updated = favorites.filter(fav => fav.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }
    setFavorites(updated);
    localStorage.setItem("cinestream_favs_payloads", JSON.stringify(updated));
    
    const legacyFavsIds = updated.map(m => m.id);
    localStorage.setItem("cinestream_favs", JSON.stringify(legacyFavsIds));
  };

  const toggleWatchlist = (movie: Movie) => {
    let updated: Movie[];
    if (watchlist.some(w => w.id === movie.id)) {
      updated = watchlist.filter(w => w.id !== movie.id);
    } else {
      updated = [...watchlist, movie];
    }
    setWatchlist(updated);
    localStorage.setItem("cinestream_watchlist_payloads", JSON.stringify(updated));

    const legacyWatchIds = updated.map(m => m.id);
    localStorage.setItem("cinestream_watchlist", JSON.stringify(legacyWatchIds));
  };

  const handleClearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("cinestream_favs_payloads");
    localStorage.removeItem("cinestream_favs");
  };

  const handleWatchTrailer = async (movie: Movie) => {
    try {
      const response = await fetch(`/api/movies/${movie.id}/trailer`);
      const data = await response.json();
      if (data && data.videoId) {
        setVideoOverlayUrl(`https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`);
      } else {
        setVideoOverlayUrl(`https://www.youtube.com/embed/u48_JpUloGY?autoplay=1&mute=0&rel=0&modestbranding=1`);
      }
    } catch (err) {
      console.error("Failed to fetch trailer overlay ID:", err);
      setVideoOverlayUrl(`https://www.youtube.com/embed/u48_JpUloGY?autoplay=1&mute=0&rel=0&modestbranding=1`);
    }
  };

  return (
    <div className="min-h-screen bg-noir-950 text-gray-100 flex flex-col selection:bg-crimson-500 selection:text-white">
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabTransition}
        favoritesCount={favorites.length}
        isTMDBActive={isTMDBActive}
      />

      <main className="flex-1">
        <AppRoutes
          activeTab={activeTab}
          onTabChange={handleTabTransition}
          favorites={favorites}
          onFavoriteToggle={toggleFavorite}
          onWatchlistToggle={toggleWatchlist}
          watchlist={watchlist}
          onWatchTrailer={handleWatchTrailer}
          onClearAllFavorites={handleClearAllFavorites}
          isTMDBActive={isTMDBActive}
          setIsTMDBActive={setIsTMDBActive}
        />
      </main>

      <AnimatePresence>
        {videoOverlayUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <div className="w-full max-w-4xl bg-black rounded-2xl border border-noir-800 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden relative">
              <button
                onClick={() => setVideoOverlayUrl(null)}
                className="absolute top-3 right-3 z-30 w-10 h-10 bg-black/80 hover:bg-crimson-600 text-white rounded-full flex items-center justify-center hover:scale-105 transition active:scale-95 cursor-pointer text-2xl font-bold shadow-lg"
                title="Close Trailer"
              >
                &times;
              </button>

              <div className="relative aspect-video bg-black">
                <iframe
                  src={videoOverlayUrl}
                  title="Movie Trailer/Teaser"
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
