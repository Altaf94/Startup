import type { Metadata } from 'next';
import { MenuGrid } from '@/app/components';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Explore our authentic Italian menu featuring fresh handmade pasta, signature dishes, appetizers, and desserts. Order online for delivery or pickup.',
  openGraph: {
    title: 'Menu | The Saucy Pan',
    description: 'Explore our authentic Italian menu featuring fresh handmade pasta, signature dishes, appetizers, and desserts.',
    images: ['/og-image.jpg'],
  },
};

export default function MenuPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover our collection of authentic Italian dishes, crafted with love 
            and the finest ingredients.
          </p>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MenuGrid />
      </div>
    </div>
  );
}
