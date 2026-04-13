import { BranchLocation } from '@/app/types';

export const branchLocations: BranchLocation[] = [
  {
    id: 'downtown-pickup',
    name: 'The Saucy Pan Downtown Pickup',
    address: '123 Main Street, Downtown, NY 10001',
    phone: '(212) 555-0100',
    email: 'downtown@thesaucypan.com',
    hours: 'Sat-Sun: 1:00 PM - 12:00 AM',
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  {
    id: 'uptown-pickup',
    name: 'The Saucy Pan Uptown Pickup',
    address: '456 Park Avenue, Uptown, NY 10022',
    phone: '(212) 555-0200',
    email: 'uptown@thesaucypan.com',
    hours: 'Mon-Sun: 11:00 AM - 11:00 PM',
    coordinates: {
      lat: 40.7614,
      lng: -73.9776,
    },
  },
  {
    id: 'brooklyn-pickup',
    name: 'The Saucy Pan Brooklyn Pickup',
    address: '789 Atlantic Avenue, Brooklyn, NY 11217',
    phone: '(718) 555-0300',
    email: 'brooklyn@thesaucypan.com',
    hours: 'Mon-Thu: 11:00 AM - 9:00 PM, Fri-Sun: 11:00 AM - 11:00 PM',
    coordinates: {
      lat: 40.6892,
      lng: -73.9857,
    },
  },
];
