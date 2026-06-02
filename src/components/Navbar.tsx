import React from "react";
import { Heart, Film, Search } from "lucide-react";
import "./navbar.css";

interface NavbarProps {
  activeTab: "discover" | "favorites";
  onTabChange: (tab: "discover" | "favorites") => void;
  favoritesCount: number;
  isTMDBActive: boolean;
}

export default function Navbar({
  activeTab,
  onTabChange,
  favoritesCount,
  isTMDBActive
}: NavbarProps) {
  const handleSearchScroll = () => {
    if (activeTab !== "discover") {
      onTabChange("discover");
      setTimeout(() => {
        const searchSection = document.getElementById("discovery-search-section");
        if (searchSection) {
          searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 350);
    } else {
      const searchSection = document.getElementById("discovery-search-section");
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent flex flex-col pointer-events-none">
      {/* Topmost Premium Announcement Bar */}
      <div className="w-full bg-[#050505] border-b border-white/5 py-2 px-4 text-center text-[11px] sm:text-xs text-white font-display tracking-wider flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pointer-events-auto select-none">
        <span>Discover trending releases, curated recommendations, and cinematic gems updated daily</span>
        <button 
          onClick={handleSearchScroll} 
          className="text-amber-450 hover:text-amber-300 font-bold tracking-wide transition-colors duration-150 inline-flex items-center gap-1 cursor-pointer underline"
        >
          Start Exploring <span className="text-[10px]">&rarr;</span>
        </button>
      </div>

      {/* Main Navigation - Completely Transparent, Floating Capsules */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between gap-4 pointer-events-auto">
        
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 min-w-0">
          <div 
            onClick={() => onTabChange("discover")}
            className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
          >
            <div className="p-2 rounded-full bg-black/90 border border-noir-800 text-crimson-500 group-hover:text-white group-hover:bg-crimson-600 transition-all duration-300">
              <Film className="w-4 h-4" />
            </div>
            
            <div className="bg-black/90 border border-noir-800/90 rounded-full px-3 py-1 transition-all duration-300 group-hover:border-noir-700">
              <span className="font-sans font-black tracking-widest text-sm sm:text-base whitespace-nowrap flex items-center uppercase">
                <span className="text-crimson-500">CINE</span>
                <span className="text-white font-light">STREAM</span>
              </span>
            </div>
          </div>

          <div className="bg-black/90 border border-noir-800 rounded-full p-1 flex items-center gap-1 shadow-lg select-none shrink-0">
            <button
              onClick={() => onTabChange("discover")}
              className={`px-3 py-1 rounded-full text-xs sm:text-sm uppercase font-display font-extrabold tracking-widest transition-all duration-300 cursor-pointer ${
                activeTab === "discover"
                  ? "bg-crimson-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-noir-900/40"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onTabChange("favorites")}
              className={`px-3 py-1 rounded-full text-xs sm:text-sm uppercase font-display font-extrabold tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                activeTab === "favorites"
                  ? "bg-crimson-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-noir-900/40"
              }`}
            >
              Favorites
              {favoritesCount > 0 && (
                <span className={`px-1.5 py-0.5 text-[10px] font-black rounded-full font-mono ${
                  activeTab === "favorites" ? "bg-white text-crimson-600" : "bg-crimson-500/20 text-crimson-400"
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <button
            onClick={handleSearchScroll}
            className="p-2 rounded-full bg-black/90 border border-noir-800 text-gray-400 hover:text-crimson-500 hover:border-crimson-500 transition-all duration-300 cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
