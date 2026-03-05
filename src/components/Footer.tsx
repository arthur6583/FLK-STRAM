import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Youtube, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0c] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-black tracking-tighter violet-gradient-text">VIOLET</h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Experience the future of streaming with our premium liquid glass interface. 
            Designed for those who appreciate elegance and performance.
          </p>
          <div className="flex gap-4">
            {[Twitter, Instagram, Youtube, Github].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-full bg-white/5 hover:bg-violet-500/20 hover:text-violet-400 transition-all">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-6">Platform</h3>
          <ul className="space-y-4 text-sm text-white/50">
            <li><a href="#" className="hover:text-white transition-colors">Browse Movies</a></li>
            <li><a href="#" className="hover:text-white transition-colors">TV Shows</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Live TV</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Originals</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-6">Support</h3>
          <ul className="space-y-4 text-sm text-white/50">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-6">Newsletter</h3>
          <p className="text-sm text-white/50 mb-4">Subscribe to get the latest updates on new releases.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-violet-500 w-full"
            />
            <button className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
        <p>© 2024 VioletStream. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Cookie Settings</a>
          <a href="#" className="hover:text-white">Ad Choices</a>
        </div>
      </div>
    </footer>
  );
};
