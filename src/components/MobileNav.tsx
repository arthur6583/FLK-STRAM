import React from 'react';
import { Home, Search, PlaySquare, Bookmark, User } from 'lucide-react';
import { motion } from 'motion/react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { icon: Home, label: 'Home', id: 'Home' },
    { icon: Search, label: 'Search', id: 'Search' },
    { icon: PlaySquare, label: 'New', id: 'New & Popular' },
    { icon: Bookmark, label: 'My List', id: 'My List' },
    { icon: User, label: 'Profile', id: 'Profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel rounded-3xl p-2 flex items-center justify-between shadow-[0_20px_50px_rgba(124,58,237,0.3)] border-white/20"
      >
        {navItems.map((item, i) => (
          <button 
            key={i}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${
              activeTab === item.id ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/40' : 'text-white/50 hover:text-white'
            }`}
          >
            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};
