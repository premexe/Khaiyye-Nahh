import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Navigation } from 'lucide-react';

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

interface LiveSuggestionsProps {
  data: BhandaraData[];
  userLocation?: { lat: number; lng: number } | null;
  onLocationClick: (location: BhandaraData) => void;
}

const LiveSuggestions: React.FC<LiveSuggestionsProps> = ({ data, userLocation, onLocationClick }) => {
  const [nearbyLocations, setNearbyLocations] = useState<BhandaraData[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  useEffect(() => {
    if (userLocation) {
      const nearby = data
        .map(location => ({
          ...location,
          distance: calculateDistance(userLocation.lat, userLocation.lng, location.lat, location.lng)
        }))
        .filter(location => location.distance <= 100) // Within 100km
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5); // Top 5 nearest

      setNearbyLocations(nearby);
      setIsVisible(true);
    } else {
      // Show Mumbai area locations by default
      const mumbaiArea = data.filter(location => 
        location.city.toLowerCase().includes('mumbai') ||
        location.city.toLowerCase().includes('virar') ||
        location.city.toLowerCase().includes('vasai') ||
        location.city.toLowerCase().includes('palghar') ||
        location.city.toLowerCase().includes('boisar')
      );
      setNearbyLocations(mumbaiArea.slice(0, 5));
      setIsVisible(true);
    }
  }, [data, userLocation]);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // This would be handled by parent component
          console.log('Location:', position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (!isVisible || nearbyLocations.length === 0) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 max-w-sm"
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-sm">
            {userLocation ? 'Nearby Bhandaras' : 'Mumbai Area Bhandaras'}
          </h3>
          {!userLocation && (
            <motion.button
              onClick={requestLocation}
              className="p-1.5 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg border border-orange-500/30 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Navigation className="w-3 h-3 text-orange-400" />
            </motion.button>
          )}
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {nearbyLocations.map((location, index) => (
              <motion.div
                key={location.id}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 cursor-pointer transition-all duration-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => onLocationClick(location)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate mb-1">
                      {location.name}
                    </h4>
                    <div className="flex items-center text-gray-400 text-xs mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="truncate">{location.city}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      <span className="truncate">{location.timing}</span>
                    </div>
                  </div>
                  <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                    {location.type.split(' ')[0]}
                  </span>
                </div>
                {(location as any).distance && (
                  <div className="mt-2 text-xs text-orange-400">
                    ~{Math.round((location as any).distance)} km away
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={() => setIsVisible(false)}
          className="w-full mt-3 py-2 text-xs text-gray-400 hover:text-white transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
        >
          Hide suggestions
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LiveSuggestions;