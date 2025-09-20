import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import GlobeComponent from './components/Globe';
import LocationModal from './components/LocationModal';
import LiveSuggestions from './components/LiveSuggestions';
import RegisterForm from './components/RegisterForm';
import About from './components/About';
import Footer from './components/Footer';
import bhandaraData from './data/bhandara-data.json';

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

function App() {
  const [selectedLocation, setSelectedLocation] = useState<BhandaraData | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLocationClick = (location: BhandaraData) => {
    setSelectedLocation(location);
  };

  const handleCloseModal = () => {
    setSelectedLocation(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleRegisterClick = () => {
    setIsRegisterFormOpen(true);
  };

  const handleCloseRegisterForm = () => {
    setIsRegisterFormOpen(false);
  };

  // Request user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied or unavailable');
        }
      );
    }
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🍲
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Khaiyye Nahh...</h1>
          <p className="text-gray-400">Loading acts of compassion...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Apply Apple SF font with Inter fallback */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
        }
      `}</style>
      
      <Navbar 
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
        onRegisterClick={handleRegisterClick}
      />
      
      <main className="relative">
        <section className="h-screen relative overflow-hidden">
          <GlobeComponent
            data={bhandaraData}
            onLocationClick={handleLocationClick}
            searchValue={searchValue}
          />
          
          {/* Welcome overlay */}
          <motion.div
            className="absolute top-1/2 left-8 transform -translate-y-1/2 z-10 max-w-md hidden lg:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h2 className="text-4xl font-bold mb-4">
                Discover Sacred
                <span className="text-transparent bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text">
                  {' '}Food Service
                </span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Explore Bhandara locations worldwide where free meals are served with love and compassion.
              </p>
              <motion.div
                className="text-sm text-gray-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Click on any location to learn more ✨
              </motion.div>
            </div>
          </motion.div>
          
          <LiveSuggestions
            data={bhandaraData}
            userLocation={userLocation}
            onLocationClick={handleLocationClick}
          />
        </section>
        
        <About />
      </main>
      
      <Footer />
      
      <LocationModal
        location={selectedLocation}
        onClose={handleCloseModal}
      />
      
      <RegisterForm
        isOpen={isRegisterFormOpen}
        onClose={handleCloseRegisterForm}
      />
    </div>
  );
}

export default App;