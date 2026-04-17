'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCart } from './cart-context';

export type OrderType = 'delivery';

const RESTAURANT_LAT = 24.9215;
const RESTAURANT_LNG = 67.1114;
const RATE_PER_KM = 30;
const MIN_DELIVERY_FEE = 50;

function calcDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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

  // Open modal on mount so user can set location before ordering
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const setSelectedLocation = (location: string) => {
    setSelectedLocationState(location);
    setUserCoords(null); // clear coords when manually typed
  };

  const setLocationWithCoords = (location: string, coords: { lat: number; lng: number }) => {
    setSelectedLocationState(location);
    setUserCoords(coords);
  };

  const confirmLocation = () => {
    if (userCoords) {
      const distKm = calcDistanceKm(userCoords.lat, userCoords.lng, RESTAURANT_LAT, RESTAURANT_LNG);
      const fee = Math.max(Math.round(distKm * RATE_PER_KM), MIN_DELIVERY_FEE);
      setDeliveryFee(fee);
    }
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
