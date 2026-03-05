import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearchClick: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, onSearchClick, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
        isScrolled ? 'bg-[#0a0a0c]/80 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => onTabChange('Home')}
            className="text-2xl font-black tracking-tighter violet-gradient-text cursor-pointer"
          >
            VIOLET
          </motion.h1>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
            {menuItems.map((item) => (
              <button 
                key={item} 
                onClick={() => onTabChange(item)}
                className={`transition-colors relative group ${activeTab === item ? 'text-white' : 'hover:text-white'}`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-violet-500 transition-all duration-300 ${activeTab === item ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onSearchClick}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full border border-[#0a0a0c]" />
            </button>
          </div>
          
          <div className="hidden sm:flex items-center gap-3 glass-panel p-1 rounded-full pl-3 group relative cursor-pointer">
            <span className="text-xs font-semibold">Guest</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center overflow-hidden border border-white/20">
              <User size={18} />
            </div>
            
            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-2 w-48 glass-panel rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl">
              <button 
                onClick={() => onTabChange('Profile')}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 rounded-xl transition-colors text-sm"
              >
                <User size={16} />
                Profile
              </button>
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors text-sm"
              >
                <X size={16} />
                Reset Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
