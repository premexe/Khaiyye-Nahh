import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface NavbarProps {
  onSearchChange: (value: string) => void;
  searchValue: string;
  onRegisterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchChange, searchValue, onRegisterClick }) => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-2xl">🍲</span>
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Khaiyye Nahh...
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <input
                type="text"
                placeholder="Search by city or country..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-64 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.div>
            
            <motion.a
              href="#about"
              className="text-white/80 hover:text-white transition-colors duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              About
            </motion.a>
            
            <motion.button
              onClick={onRegisterClick}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 border border-orange-500/30 rounded-full text-white/90 hover:text-white transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              <span>Register Bhandara</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;