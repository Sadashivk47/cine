import React, { useState } from "react";
import { Play, Film, Tv, Heart } from "lucide-react";
import { motion } from "motion/react";
import { Movie } from "../types/movie";

interface MovieCardProps {
  key?: React.Key | string | number;
  movie: Movie;
  isFavorite: boolean;
  onFavoriteToggle: (m: Movie) => void;
  onWatchlistToggle: (m: Movie) => void;
  isOnWatchlist: boolean;
  onWatchTrailer: (m: Movie) => void;
}

export default function MovieCard({ 
  movie, 
  isFavorite, 
  onFavoriteToggle,
  onWatchlistToggle,
  isOnWatchlist,
  onWatchTrailer
}: MovieCardProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col items-start bg-noir-900 border border-noir-800 rounded-xl overflow-hidden hover:border-crimson-500/40 hover:shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-all"
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-noir-950">
        {movie.posterUrl && !hasError ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110 select-none pointer-events-none"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-noir-955 text-gray-600 border-b border-noir-800 absolute inset-0">
            <Film className="w-8 h-8 text-noir-700 mb-2" />
            <span className="text-xs font-semibold text-gray-400">No Cover Available</span>
            <span className="text-[10px] text-gray-500 font-mono mt-1 leading-tight max-w-[125px] line-clamp-2">{movie.title}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWatchTrailer(movie);
            }}
            className="w-full py-2 bg-crimson-500 hover:bg-crimson-400 text-white rounded-lg font-bold text-xs transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Play Trailer</span>
          </button>
        </div>

        <div className="absolute top-2.5 left-2.5 z-10 bg-black/70 backdrop-blur-md px-2 py-1 rounded border border-white/5 flex items-center gap-1 text-[9px] font-mono font-bold text-gray-300">
          {movie.type === "tv" ? <Tv className="w-3 h-3 text-purple-400" /> : <Film className="w-3 h-3 text-cyan-400" />}
          {movie.type === "tv" ? "SERIES" : "CINEMA"}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(movie);
          }}
          className="absolute top-2.5 right-2.5 z-10 w-8.5 h-8.5 rounded-full bg-black/60 hover:bg-black/95 backdrop-blur-sm border border-white/5 flex items-center justify-center hover:scale-110 active:scale-90 transition shadow cursor-pointer"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart 
            className={`w-4 h-4 transition ${
              isFavorite 
                ? "fill-crimson-500 text-crimson-500 inline-block scale-110" 
                : "text-gray-300"
            }`} 
          />
        </button>
      </div>

      <div className="w-full p-3.5 flex flex-col gap-1 shrink-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          {movie.genres.slice(0, 2).map((g, idx) => (
            <span key={idx} className="text-[10px] text-gray-500 font-mono tracking-wide uppercase">
              {g}
            </span>
          ))}
        </div>

        <h3 className="font-sans font-bold text-white text-[13px] leading-snug tracking-tight truncate w-full group-hover:text-crimson-400 transition" title={movie.title}>
          {movie.title}
        </h3>

        <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 mt-0.5 pt-1.5 border-t border-noir-800/40">
          <span>{movie.year}</span>
          <span className="text-amber-500 font-bold flex items-center gap-0.5">
            ★ {movie.rating}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col items-start bg-noir-900 border border-noir-800 rounded-xl overflow-hidden select-none">
      <div className="relative w-full aspect-[2/3] cinematic-shimmer" />
      <div className="w-full p-3.5 flex flex-col gap-2 shrink-0">
        <div className="w-12 h-3.5 rounded bg-noir-800 cinematic-shimmer" />
        <div className="w-3/4 h-4 rounded bg-noir-800 cinematic-shimmer" />
        <div className="flex items-center justify-between mt-1">
          <div className="w-8 h-3.5 rounded bg-noir-800 cinematic-shimmer" />
          <div className="w-10 h-3.5 rounded bg-noir-800 cinematic-shimmer" />
        </div>
      </div>
    </div>
  );
}
