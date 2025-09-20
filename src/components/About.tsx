import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            About Khaiyye Nahh...
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Discovering the sacred tradition of free food service across the globe
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Seva & Service</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bhandara represents the beautiful tradition of selfless service, where communities come together to feed anyone who needs a meal, regardless of background.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Unity & Equality</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              These sacred kitchens break down barriers of caste, creed, and class, serving everyone with the same love and respect, embodying true human unity.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <Globe className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Global Compassion</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              From Sikh langars to temple annadanams, these acts of compassion span across cultures, showing how food becomes a universal language of love.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="bg-gradient-to-r from-orange-500/10 to-green-500/10 backdrop-blur-sm border border-orange-500/20 rounded-3xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
          <p className="text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Khaiyye Nahh... aims to map and celebrate these incredible acts of generosity worldwide. 
            By showcasing these sacred spaces of nourishment, we hope to inspire more people to participate 
            in this ancient tradition of feeding the hungry and building community through shared meals.
          </p>
          <motion.div 
            className="mt-6 text-6xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🙏
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;