import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Hero } from './components/Hero';
import { MovieRow } from './components/MovieRow';
import { Footer } from './components/Footer';
import { MovieModal } from './components/MovieModal';
import { MOVIES, Movie } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { Search as SearchIcon, X, Loader2, User } from 'lucide-react';

export default function App() {
  const [isDiscordVerified, setIsDiscordVerified] = useState<boolean>(() => {
    return localStorage.getItem('discord_verified') === 'true';
  });
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [myList, setMyList] = useState<string[]>([]);
  const [likedMovies, setLikedMovies] = useState<string[]>([]);

  useEffect(() => {
    // No auth check needed anymore
  }, []);

  const handleLogout = () => {
    // Simplified logout (just clear verification if needed, or do nothing)
    localStorage.removeItem('discord_verified');
    setIsDiscordVerified(false);
    setActiveTab('Home');
  };

  const toggleMyList = (movieId: string) => {
    setMyList(prev => 
      prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId]
    );
  };

  const toggleLike = (movieId: string) => {
    setLikedMovies(prev => 
      prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId]
    );
  };

  const filteredMovies = useMemo(() => {
    if (!searchQuery) return [];
    return MOVIES.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const featuredMovie = MOVIES.find(m => m.id === '10') || MOVIES[0];
  const trendingMovies = MOVIES.filter(m => m.isTrending);
  const newMovies = MOVIES.filter(m => m.isNew);
  const sciFiMovies = MOVIES.filter(m => m.genre.includes('Sci-Fi'));
  const tvShows = MOVIES.filter(m => m.duration.includes('Season'));
  const moviesOnly = MOVIES.filter(m => !m.duration.includes('Season'));
  const myListMovies = MOVIES.filter(m => myList.includes(m.id));

  const handlePlay = (movie: Movie) => {
    if (movie.videoUrl) {
      window.open(movie.videoUrl, '_blank');
    } else {
      // Fallback for movies without a URL (optional: show a toast or alert)
      alert("This video is not available yet.");
    }
  };

  const renderContent = () => {
    if (activeTab === 'Search' || isSearchOpen) {
      return (
        <div className="pt-32 px-6 min-h-[60vh]">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={24} />
              <input 
                autoFocus
                type="text"
                placeholder="Search movies, shows, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-xl focus:outline-none focus:border-violet-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {searchQuery ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMovies.map(movie => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSelectedMovie(movie)}
                  className="relative aspect-[16/9] rounded-xl overflow-hidden cursor-pointer group"
                >
                  <img src={movie.thumbnail} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-bold text-sm">{movie.title}</span>
                  </div>
                </motion.div>
              ))}
              {filteredMovies.length === 0 && (
                <div className="col-span-full text-center py-20 text-white/40">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 text-white/40">
              Start typing to search...
            </div>
          )}
        </div>
      );
    }

    switch (activeTab) {
      case 'TV Shows':
        return tvShows.length > 0 ? (
          <MovieRow 
            title="Popular TV Shows" 
            movies={tvShows} 
            onMovieClick={setSelectedMovie}
            onViewAll={() => setActiveTab('TV Shows')}
            myList={myList}
            onToggleMyList={toggleMyList}
          />
        ) : (
          <div className="py-20 text-center text-white/40">No TV Shows available.</div>
        );
      case 'Movies':
        return (
          <MovieRow 
            title="Blockbuster Movies" 
            movies={moviesOnly} 
            onMovieClick={setSelectedMovie}
            onViewAll={() => setActiveTab('Movies')}
            myList={myList}
            onToggleMyList={toggleMyList}
          />
        );
      case 'New & Popular':
        return (
          <>
            {newMovies.length > 0 && (
              <MovieRow 
                title="New Releases" 
                movies={newMovies} 
                onMovieClick={setSelectedMovie}
                onViewAll={() => setActiveTab('New & Popular')}
                myList={myList}
                onToggleMyList={toggleMyList}
              />
            )}
            {trendingMovies.length > 0 && (
              <MovieRow 
                title="Trending Now" 
                movies={trendingMovies} 
                onMovieClick={setSelectedMovie}
                onViewAll={() => setActiveTab('New & Popular')}
                myList={myList}
                onToggleMyList={toggleMyList}
              />
            )}
          </>
        );
      case 'My List':
        return myListMovies.length > 0 ? (
          <MovieRow 
            title="My List" 
            movies={myListMovies} 
            onMovieClick={setSelectedMovie}
            onViewAll={() => setActiveTab('Movies')}
            myList={myList}
            onToggleMyList={toggleMyList}
          />
        ) : (
          <div className="py-20 text-center text-white/40">Your list is empty. Start adding movies!</div>
        );
      case 'Profile':
        return (
          <div className="py-20 px-6 max-w-md mx-auto text-center space-y-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto border-4 border-white/10 shadow-2xl">
              <User size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tighter">Guest User</h2>
              <p className="text-white/40">Discord Verified Access</p>
            </div>
            <div className="pt-8 space-y-4">
              <button 
                onClick={handleLogout}
                className="w-full bg-red-500/20 text-red-400 font-bold py-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
              >
                Reset Verification
              </button>
            </div>
          </div>
        );
      default:
        return (
          <>
            {trendingMovies.length > 0 && (
              <MovieRow 
                title="Trending Now" 
                movies={trendingMovies} 
                onMovieClick={setSelectedMovie}
                onViewAll={() => setActiveTab('New & Popular')}
                myList={myList}
                onToggleMyList={toggleMyList}
              />
            )}
            {newMovies.length > 0 && (
              <MovieRow 
                title="New Releases" 
                movies={newMovies} 
                onMovieClick={setSelectedMovie}
                onViewAll={() => setActiveTab('New & Popular')}
                myList={myList}
                onToggleMyList={toggleMyList}
              />
            )}
            
            <div className="px-6 py-8 md:py-12">
              <div className="relative h-48 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1920" 
                  alt="Banner"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-900/90 to-transparent flex flex-col justify-center p-6 md:p-12">
                  <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-4">Unlimited Entertainment</h2>
                  <p className="text-sm md:text-lg text-white/70 max-w-md mb-4 md:md-6 line-clamp-2 md:line-clamp-none">
                    Watch anywhere. Cancel anytime. Start your free trial today and experience the future of streaming.
                  </p>
                  <button className="w-fit px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl bg-white text-black font-bold hover:bg-violet-400 hover:text-white transition-all active:scale-95 text-sm md:text-base">
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            {sciFiMovies.length > 0 && (
              <MovieRow 
                title="Sci-Fi Masterpieces" 
                movies={sciFiMovies} 
                onMovieClick={setSelectedMovie}
                onViewAll={() => setActiveTab('Movies')}
                myList={myList}
                onToggleMyList={toggleMyList}
              />
            )}
            <MovieRow 
              title="Continue Watching" 
              movies={MOVIES} 
              onMovieClick={setSelectedMovie}
              onViewAll={() => setActiveTab('Home')}
              myList={myList}
              onToggleMyList={toggleMyList}
            />
          </>
        );
    }
  };

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const handleVerifyDiscord = () => {
    setIsVerifying(true);
    setVerificationError(null);
    window.open("https://discord.gg/atWBtmQxMP", '_blank');
    
    // Wait a bit to simulate verification/give user time to click
    setTimeout(() => {
      localStorage.setItem('discord_verified', 'true');
      setIsDiscordVerified(true);
      setIsVerifying(false);
    }, 3000);
  };

  if (!isDiscordVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 blur-[120px] rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-panel p-8 md:p-10 rounded-3xl text-center space-y-6 relative z-10"
        >
          <div className="w-20 h-20 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-violet-600/20">
            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight">Discord Required</h2>
            <p className="text-white/60 text-sm">
              To access VioletStream, you must be part of our Discord community.
            </p>
          </div>

          {verificationError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs font-medium bg-red-400/10 p-3 rounded-xl border border-red-400/20"
            >
              {verificationError}
            </motion.p>
          )}

          <button 
            onClick={handleVerifyDiscord}
            disabled={isVerifying}
            className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-violet-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Verifying...
              </>
            ) : (
              'Join & Verify'
            )}
          </button>
          <button 
            onClick={handleLogout}
            className="text-white/40 hover:text-white text-xs underline"
          >
            Reset and try again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsSearchOpen(false);
          window.scrollTo(0, 0);
        }} 
        onSearchClick={() => {
          setIsSearchOpen(true);
          setActiveTab('Search');
        }}
        onLogout={handleLogout}
      />
      
      <main>
        {activeTab === 'Home' && !isSearchOpen && <Hero movie={featuredMovie} onInfoClick={setSelectedMovie} onPlayClick={handlePlay} />}
        
        <motion.div 
          key={activeTab + isSearchOpen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative z-10 space-y-4 ${activeTab === 'Home' && !isSearchOpen ? '-mt-20 md:-mt-32' : 'pt-20'}`}
        >
          {renderContent()}
        </motion.div>
      </main>

      <Footer />
      <MobileNav activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        setIsSearchOpen(tab === 'Search');
        window.scrollTo(0, 0);
      }} />

      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
        onPlay={(movie) => {
          setSelectedMovie(null);
          handlePlay(movie);
        }}
        isLiked={selectedMovie ? likedMovies.includes(selectedMovie.id) : false}
        isInList={selectedMovie ? myList.includes(selectedMovie.id) : false}
        onToggleLike={(id) => toggleLike(id)}
        onToggleList={(id) => toggleMyList(id)}
      />

      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
