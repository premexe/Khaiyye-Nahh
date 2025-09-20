import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="bg-black border-t border-white/10 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div 
          className="flex items-center justify-center space-x-2 mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-2xl">🍲</span>
          <h3 className="text-xl font-semibold text-white">Khaiyye Nahh...</h3>
        </motion.div>
        
        <motion.p 
          className="text-gray-400 mb-4 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Mapping acts of compassion across the globe, one meal at a time.
        </motion.p>
        
        <motion.div 
          className="flex items-center justify-center space-x-2 text-gray-500 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <span>© 2025 Khaiyye Nahh... | Built by Prem (Maay Baap) with</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          >
            <Heart className="w-4 h-4 text-red-400 fill-current" />
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
