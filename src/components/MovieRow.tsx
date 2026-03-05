import React from 'react';
import { motion } from 'motion/react';
import { Play, Plus, Star } from 'lucide-react';
import { Movie } from '../data';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  isInList?: boolean;
  onToggleList?: (id: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, isInList, onToggleList }) => {
  return (
    <div className="flex-none w-48 md:w-64 space-y-3">
      <motion.div 
        whileHover={{ scale: 1.05, y: -10 }}
        onClick={() => onClick(movie)}
        className="relative aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group shadow-lg shadow-black/40"
      >
        <img 
          src={movie.thumbnail} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
          <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-violet-500 hover:text-white transition-colors">
                  <Play size={14} fill="currentColor" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleList?.(movie.id);
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isInList 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/40'
                  }`}
                >
                  <Plus size={14} className={isInList ? 'rotate-45 transition-transform' : 'transition-transform'} />
                </button>
              </div>
              <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                <Star size={12} fill="currentColor" />
                {movie.rating}
              </div>
            </div>
            
            <div className="flex gap-2">
              {movie.genre.slice(0, 2).map(g => (
                <span key={g} className="text-[10px] text-white/60">{g}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {movie.isNew && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-bold uppercase">New</span>
          )}
          {movie.isTrending && (
            <span className="px-2 py-0.5 rounded-full bg-violet-600 text-[10px] font-bold uppercase tracking-tighter">Trending</span>
          )}
        </div>
      </motion.div>
      
      <div className="px-1">
        <h3 className="font-bold text-sm md:text-base truncate text-white/90 group-hover:text-violet-400 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] md:text-xs text-white/40 font-medium">{movie.year}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-[10px] md:text-xs text-white/40 font-medium">{movie.duration}</span>
        </div>
      </div>
    </div>
  );
};

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onViewAll?: () => void;
  myList?: string[];
  onToggleMyList?: (id: string) => void;
}

export const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onMovieClick, onViewAll, myList = [], onToggleMyList }) => {
  return (
    <div className="space-y-4 py-4 md:py-8">
      <div className="flex items-center justify-between px-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
        <button 
          onClick={onViewAll}
          className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
        >
          View All
        </button>
      </div>
      
      <div className="flex gap-6 overflow-x-auto px-6 pb-8 no-scrollbar scroll-smooth">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={onMovieClick} 
            isInList={myList.includes(movie.id)}
            onToggleList={onToggleMyList}
          />
        ))}
      </div>
    </div>
  );
};
