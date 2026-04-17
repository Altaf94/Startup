'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation, Loader2, MapPin, ChevronDown } from 'lucide-react';
import { useLocation } from '@/app/lib/location-context';
import { karachiAreas } from '@/app/data/karachi-areas';

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=18&addressdetails=1`,
      { headers: { 'Accept-Language': 'en-US,en', 'Accept': 'application/json' }, signal: controller.signal }
    );
    if (!res.ok) throw new Error('Geocode failed');
    const data = await res.json();
    const a = data.address ?? {};
    const street = a.road ?? a.pedestrian ?? a.footway ?? a.path ?? '';
    const area = a.neighbourhood ?? a.suburb ?? a.quarter ?? a.hamlet ?? '';
    const city = a.city ?? a.town ?? a.village ?? '';
    const parts = [street, area, city].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : data.display_name;
  } finally {
    clearTimeout(timer);
  }
}

export default function LocationModal() {
  const { isModalOpen, confirmLocation, selectedLocation, setLocationWithCoords, userCoords } = useLocation();
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState('');
  const [inputMethod, setInputMethod] = useState<'gps' | 'dropdown'>('gps');
  const [selectedArea, setSelectedArea] = useState('');

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
          setLocationWithCoords(`${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E`, { lat: latitude, lng: longitude });
          setLocError('Could not resolve your address name, but location was detected.');
        }
        setLocating(false);
      },
      (err) => {
        if (err.code === 1) {
          setLocError('Location permission denied. Please select your area from the dropdown instead.');
        } else if (err.code === 2) {
          setLocError('Location unavailable. Please select your area from the dropdown instead.');
        } else {
          setLocError('Location timed out. Please select your area from the dropdown instead.');
        }
        setLocating(false);
        setInputMethod('dropdown');
      },
      { timeout: 5000, enableHighAccuracy: false, maximumAge: 300000 }
    );
  };

  const handleAreaSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setSelectedArea(name);
    if (!name) return;
    const area = karachiAreas.find((a) => a.name === name);
    if (area) {
      setLocationWithCoords(area.name + ', Karachi', { lat: area.lat, lng: area.lng });
    }
  };

  const handleConfirm = () => {
    if (!selectedLocation || !userCoords) return;
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
            className="fixed inset-0 bg-black/60 z-40"
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
                <h2 className="text-xl font-bold text-gray-900">
                  {userCoords ? 'Confirm your delivery location' : 'Select your delivery location'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {userCoords
                    ? `Delivering to: ${selectedLocation}`
                    : 'We need your location.'}
                </p>
              </div>

              <div className="p-6 space-y-4">

                {/* Toggle: GPS vs Dropdown */}
                <div className="flex rounded-xl overflow-hidden border border-gray-200">
                  <button
                    onClick={() => setInputMethod('gps')}
                    className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                      inputMethod === 'gps'
                        ? 'bg-amber-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Auto-Detect
                  </button>
                  <button
                    onClick={() => setInputMethod('dropdown')}
                    className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                      inputMethod === 'dropdown'
                        ? 'bg-amber-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Select Area
                  </button>
                </div>

                {/* GPS Method */}
                {inputMethod === 'gps' && (
                  <div className="space-y-3">
                    <button
                      onClick={handleUseCurrentLocation}
                      disabled={locating}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-50 hover:bg-amber-100 disabled:opacity-60 border border-amber-200 text-amber-700 font-semibold rounded-xl transition-colors"
                    >
                      {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                      {locating ? 'Detecting your location...' : 'Use Current Location (GPS)'}
                    </button>

                    {locError && (
                      <p className="text-xs text-red-500 text-center">{locError}</p>
                    )}

                    {selectedLocation && userCoords && (
                      <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
                        <MapPin className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <p className="text-sm text-green-800 font-medium">{selectedLocation}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Dropdown Method */}
                {inputMethod === 'dropdown' && (
                  <div className="space-y-3">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <select
                        value={selectedArea}
                        onChange={handleAreaSelect}
                        className="w-full pl-9 pr-9 py-3 border border-gray-200 rounded-xl text-gray-900 bg-white outline-none text-sm appearance-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      >
                        <option value="">Select your area in Karachi...</option>
                        {karachiAreas.map((area) => (
                          <option key={area.name} value={area.name}>
                            {area.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedLocation && userCoords && (
                      <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
                        <MapPin className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <p className="text-sm text-green-800 font-medium">{selectedLocation}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Confirm Button */}
                <button
                  onClick={handleConfirm}
                  disabled={!selectedLocation || !userCoords}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white disabled:text-gray-400 font-semibold rounded-xl transition-colors"
                >
                  {!userCoords ? 'Detect or select your area first' : 'Confirm Location'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
