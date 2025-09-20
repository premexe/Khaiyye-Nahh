import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { motion } from 'framer-motion';

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

interface GlobeComponentProps {
  data: BhandaraData[];
  onLocationClick: (location: BhandaraData) => void;
  searchValue: string;
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({ data, onLocationClick, searchValue }) => {
  const globeEl = useRef<any>();
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data.filter(location => 
      location.city.toLowerCase().includes(searchValue.toLowerCase()) ||
      location.country.toLowerCase().includes(searchValue.toLowerCase()) ||
      location.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchValue]);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().enableZoom = true;
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  const handleLocationClick = (location: BhandaraData) => {
    if (globeEl.current) {
      globeEl.current.pointOfView({
        lat: location.lat,
        lng: location.lng,
        altitude: 2
      }, 1000);
    }
    onLocationClick(location);
  };

  return (
    <motion.div 
      className="w-full h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={filteredData}
        pointAltitude={0.02}
        pointRadius={0.5}
        pointResolution={12}
        pointColor={(d: any) => searchValue && 
          (d.city.toLowerCase().includes(searchValue.toLowerCase()) ||
           d.country.toLowerCase().includes(searchValue.toLowerCase()) ||
           d.name.toLowerCase().includes(searchValue.toLowerCase())) ? '#ff6b35' : '#22c55e'}
        onPointClick={handleLocationClick}
        pointLabel={(d: any) => `
          <div class="bg-black/90 backdrop-blur-sm text-white p-3 rounded-lg border border-white/20 max-w-xs">
            <div class="font-semibold text-orange-400 mb-1">${d.name}</div>
            <div class="text-sm text-gray-300 mb-2">${d.city}, ${d.country}</div>
            <div class="text-xs text-gray-400">${d.type}</div>
          </div>
        `}
        atmosphereColor="#4f46e5"
        atmosphereAltitude={0.25}
        showGlobe={true}
        showAtmosphere={true}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </motion.div>
  );
};

export default GlobeComponent;