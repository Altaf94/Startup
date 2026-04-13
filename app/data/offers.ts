import { Offer } from '@/app/types';

export const offers: Offer[] = [
  {
    id: 'offer-1',
    title: 'First Order Special',
    description: 'Get 20% off your first order when you sign up for our newsletter.',
    code: 'WELCOME20',
    discount: '20% OFF',
    validUntil: '2024-12-31',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
    terms: [
      'Valid for first-time customers only',
      'Minimum order of $30 required',
      'Cannot be combined with other offers',
      'Valid for dine-in, takeout, and delivery',
    ],
  },
 
  
];
