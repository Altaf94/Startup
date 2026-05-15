'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getDistance } from 'geolib';
import { useCart } from './cart-context';

export type OrderType = 'delivery';

// Exact restaurant coordinates - Gulshan-e-Iqbal Block 14
const RESTAURANT = {
  latitude: 24.9198,
  longitude: 67.1123
};

// Zone-based pricing aligned with Karachi road distances
// From Gulshan-e-Iqbal Block 14 restaurant
export function getDeliveryFee(distanceKm: number): number | null {
  if (distanceKm <= 3) return 150;
  if (distanceKm <= 6) return 200;
  if (distanceKm <= 9) return 300;
  if (distanceKm <= 13) return 350;
  if (distanceKm <= 20) return 450;
  return null; // out of delivery range
}

// Check if coordinates are in delivery range
export function isInDeliveryRange(coords: { lat: number; lng: number }): boolean {
  const distanceMeters = getDistance(
    { latitude: coords.lat, longitude: coords.lng },
    RESTAURANT
  );
  const distKm = distanceMeters / 1000;
  return getDeliveryFee(distKm) !== null;
}

interface LocationContextType {
  orderType: OrderType;
  selectedLocation: string;
  userCoords: { lat: number; lng: number } | null;
  isModalOpen: boolean;
  setOrderType: (type: OrderType) => void;
  setSelectedLocation: (location: string) => void;
  setLocationWithCoords: (location: string, coords: { lat: number; lng: number }) => void;
  confirmLocation: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const { setDeliveryFee } = useCart();
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [selectedLocation, setSelectedLocationState] = useState('');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Only show modal once per session if no confirmed location exists
  useEffect(() => {
    setIsHydrated(true);
    const savedLocation = localStorage.getItem('the-saucy-pan-location');
    const savedCoords = localStorage.getItem('the-saucy-pan-coords');
    const modalShownThisSession = sessionStorage.getItem('the-saucy-pan-modal-shown');
    
    let hasConfirmedLocation = false;
    
    if (savedLocation && savedCoords) {
      try {
        const coords = JSON.parse(savedCoords) as { lat: number; lng: number };
        setSelectedLocationState(savedLocation);
        setUserCoords(coords);
        // Restore delivery fee from saved coords using zone pricing
        const distanceMeters = getDistance(
          { latitude: coords.lat, longitude: coords.lng },
          RESTAURANT
        );
        const distKm = distanceMeters / 1000;
        const fee = getDeliveryFee(distKm);
        if (fee !== null) {
          setDeliveryFee(fee);
          hasConfirmedLocation = true; // Location is valid and in delivery range
        }
      } catch { /* ignore bad JSON */ }
    }
    
    // Only show modal if:
    // 1. No confirmed location exists, AND
    // 2. Modal hasn't been shown this session yet
    if (!hasConfirmedLocation && !modalShownThisSession) {
      sessionStorage.setItem('the-saucy-pan-modal-shown', 'true');
      setIsModalOpen(true);
    }
  }, []);

  const setSelectedLocation = (location: string) => {
    setSelectedLocationState(location);
    setUserCoords(null); // clear coords when manually typed
    localStorage.setItem('the-saucy-pan-location', location);
    localStorage.removeItem('the-saucy-pan-coords');
  };

  const setLocationWithCoords = (location: string, coords: { lat: number; lng: number }) => {
    setSelectedLocationState(location);
    setUserCoords(coords);
    localStorage.setItem('the-saucy-pan-location', location);
    localStorage.setItem('the-saucy-pan-coords', JSON.stringify(coords));
  };

  const confirmLocation = () => {
    // Only allow confirming if we have coords (delivery fee can be calculated)
    if (!userCoords) return;
    const distanceMeters = getDistance(
      { latitude: userCoords.lat, longitude: userCoords.lng },
      RESTAURANT
    );
    const distKm = distanceMeters / 1000;
    const fee = getDeliveryFee(distKm);
    if (fee === null) {
      // Out of delivery range - don't close modal
      return;
    }
    setDeliveryFee(fee);
    setIsModalOpen(false);
  };

  return (
    <LocationContext.Provider
      value={{
        orderType,
        selectedLocation,
        userCoords,
        isModalOpen,
        setOrderType,
        setSelectedLocation,
        setLocationWithCoords,
        confirmLocation,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) throw new Error('useLocation must be used within LocationProvider');
  return context;
}
