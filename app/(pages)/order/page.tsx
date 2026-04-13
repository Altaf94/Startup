import type { Metadata } from 'next';
import { MenuGrid } from '@/app/components';

export const metadata: Metadata = {
  title: 'Order Online',
  description: 'Order delicious Italian food online for delivery or pickup. Fresh handmade pasta, appetizers, and desserts delivered to your door.',
  openGraph: {
    title: 'Order Online | The Saucy Pan',
    description: 'Order delicious Italian food online for delivery or pickup. Fresh handmade pasta delivered to your door.',
    images: ['/og-image.jpg'],
  },
};

export default function OrderPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Order Online
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Browse our menu, add your favorites to cart, and enjoy authentic Italian
            cuisine delivered fresh to your door.
          </p>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MenuGrid />
      </div>
    </div>
  );
}
