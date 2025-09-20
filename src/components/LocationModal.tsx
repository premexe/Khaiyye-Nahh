import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Info } from 'lucide-react';

interface BhandaraData {
  id: number;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  timing: string;
  description: string;
  type: string;
}

interface LocationModalProps {
  location: BhandaraData | null;
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ location, onClose }) => {
  if (!location) return null;

  const handleDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-md w-full shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{location.name}</h2>
              <div className="flex items-center text-orange-400 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{location.city}, {location.country}</span>
              </div>
              <span className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-300 text-xs rounded-full">
                {location.type}
              </span>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4 text-white" />
            </motion.button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-1">Timing</h3>
                <p className="text-gray-300 text-sm">{location.timing}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-purple-400 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-1">Description</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{location.description}</p>
              </div>
            </div>
          </div>

          <motion.button
            onClick={handleDirections}
            className="w-full mt-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Directions
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LocationModal;