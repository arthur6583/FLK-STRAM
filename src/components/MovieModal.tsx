import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Plus, ThumbsUp, Volume2, Info, Star, Calendar, Clock } from 'lucide-react';
import { Movie } from '../data';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
  isLiked?: boolean;
  isInList?: boolean;
  onToggleLike?: (id: string) => void;
  onToggleList?: (id: string) => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({ 
  movie, 
  onClose, 
  onPlay,
  isLiked,
  isInList,
  onToggleLike,
  onToggleList
}) => {
  if (!movie) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(124,58,237,0.2)]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-violet-600 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Hero Image */}
          <div className="relative h-[300px] md:h-[450px]">
            <img
              src={movie.backdrop}
              alt={movie.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 space-y-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter">{movie.title}</h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onPlay(movie)}
                  className="px-8 py-3 rounded-xl bg-white text-black font-bold flex items-center gap-2 hover:bg-violet-500 hover:text-white transition-all active:scale-95"
                >
                  <Play size={20} fill="currentColor" />
                  Play
                </button>
                <button 
                  onClick={() => onToggleList?.(movie.id)}
                  className={`p-3 rounded-full border transition-all active:scale-90 ${
                    isInList 
                      ? 'bg-violet-600 border-violet-600 text-white' 
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <Plus size={20} className={isInList ? 'rotate-45 transition-transform' : 'transition-transform'} />
                </button>
                <button 
                  onClick={() => onToggleLike?.(movie.id)}
                  className={`p-3 rounded-full border transition-all active:scale-90 ${
                    isLiked 
                      ? 'bg-pink-600 border-pink-600 text-white' 
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <ThumbsUp size={20} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-4 text-sm font-medium">
                <span className="text-emerald-400">98% Match</span>
                <span className="text-white/60">{movie.year}</span>
                <span className="px-1.5 py-0.5 border border-white/40 rounded text-[10px] uppercase">{movie.duration}</span>
                <span className="px-1.5 py-0.5 border border-white/40 rounded text-[10px] uppercase">4K</span>
              </div>
              
              <p className="text-lg text-white/80 leading-relaxed">
                {movie.description}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-white/40 text-sm">Genres:</span>
                <p className="text-sm">{movie.genre.join(', ')}</p>
              </div>
              <div>
                <span className="text-white/40 text-sm">Rating:</span>
                <div className="flex items-center gap-2 text-yellow-400 font-bold">
                  <Star size={16} fill="currentColor" />
                  {movie.rating}
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full glass-button justify-center py-3 rounded-xl">
                  <Volume2 size={20} />
                  Trailer
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
