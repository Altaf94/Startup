'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation, Loader2, MapPin } from 'lucide-react';
import { useLocation } from '@/app/lib/location-context';

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=18&addressdetails=1`,
    { headers: { 'Accept-Language': 'en-US,en', 'Accept': 'application/json' } }
  );
  if (!res.ok) throw new Error('Geocode failed');
  const data = await res.json();
  const a = data.address ?? {};
  const street = a.road ?? a.pedestrian ?? a.footway ?? a.path ?? '';
  const area = a.neighbourhood ?? a.suburb ?? a.quarter ?? a.hamlet ?? '';
  const city = a.city ?? a.town ?? a.village ?? '';
  const parts = [street, area, city].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : data.display_name;
}

export default function LocationModal() {
  const { isModalOpen, confirmLocation, closeModal, selectedLocation, setSelectedLocation, setLocationWithCoords } = useLocation();
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState('');

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    setLocError('');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const address = await reverseGeocode(latitude, longitude);
          setLocationWithCoords(address, { lat: latitude, lng: longitude });
        } catch {
          setLocError('Could not resolve your address. Please try again.');
        }
        setLocating(false);
      },
      (err) => {
        if (err.code === 1) {
          setLocError('Permission denied. Please allow location access in your browser and try again.');
        } else if (err.code === 2) {
          setLocError('Location unavailable. Please type your address below.');
        } else {
          setLocError('Location timed out. Please type your address below.');
        }
        setLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // Handle confirm
  const handleSelect = async () => {
    if (!selectedLocation) return;
    confirmLocation();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              {/* Header */}
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Enter your delivery address</h2>
              </div>

              <div className="p-6 space-y-5">


                {/* Location Section */}
                <div className="space-y-3">
                  {/* Use Current Location */}
                  <button
                    onClick={handleUseCurrentLocation}
                    disabled={locating}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-50 hover:bg-amber-100 disabled:opacity-60 border border-amber-200 text-amber-700 font-semibold rounded-full transition-colors"
                  >
                    {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                    {locating ? 'Detecting...' : 'Use Current Location'}
                  </button>

                  {locError && (
                    <p className="text-xs text-red-500 text-center">{locError}</p>
                  )}

                  {/* Delivery: show detected address (read-only) */}
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      readOnly
                      placeholder="Click 'Use Current Location' to detect your address"
                      value={selectedLocation}
                      className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 cursor-not-allowed outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Select Button */}
                <button
                  onClick={handleSelect}
                  disabled={!selectedLocation}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white disabled:text-gray-400 font-semibold rounded-xl transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
