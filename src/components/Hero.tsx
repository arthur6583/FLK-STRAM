import React from 'react';
import { Play, Info, Star, Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Movie } from '../data';

interface HeroProps {
  movie: Movie;
  onInfoClick: (movie: Movie) => void;
  onPlayClick: (movie: Movie) => void;
}

export const Hero: React.FC<HeroProps> = ({ movie, onInfoClick, onPlayClick }) => {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img 
          src={movie.backdrop} 
          alt={movie.title}
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl space-y-4 md:space-y-6"
        >
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="px-2 py-1 rounded bg-violet-600/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
              Featured
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-bold">{movie.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <Calendar size={14} />
              <span>{movie.year}</span>
            </div>
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <Clock size={14} />
              <span>{movie.duration}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-tight">
            {movie.title}
          </h1>

          <p className="text-base md:text-lg text-white/70 leading-relaxed line-clamp-2 md:line-clamp-3">
            {movie.description}
          </p>

          <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-4">
            <button 
              onClick={() => onPlayClick(movie)}
              className="flex-1 md:flex-none px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 md:gap-3 hover:bg-violet-500 hover:text-white transition-all duration-500 shadow-xl shadow-violet-500/20 active:scale-95 group"
            >
              <Play size={20} fill="currentColor" className="group-hover:scale-110 transition-transform md:w-6 md:h-6" />
              Play
            </button>
            <button 
              onClick={() => onInfoClick(movie)}
              className="flex-1 md:flex-none glass-button px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold justify-center"
            >
              <Info size={20} className="md:w-6 md:h-6" />
              Info
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
    </div>
  );
};
