'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Plus, Flame, Search } from 'lucide-react';
import { menuItems, menuCategories } from '@/app/data/menu';
import { useCart } from '@/app/lib/cart-context';
import { formatPrice, getSpicyLabel, cn } from '@/app/lib/utils';
import { staggerContainer, staggerItem } from '@/app/lib/animations';
import type { MenuItem } from '@/app/types';

interface MenuGridProps {
  initialCategory?: string;
}

export default function MenuGrid({ initialCategory }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem, openCart } = useCart();

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
    openCart();
  };

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              activeCategory === 'all'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            All
          </button>
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === category.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-gray-500 text-sm mb-6">
        Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
      </p>

      {/* Menu Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {item.isPopular && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                  {item.isNew && (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
                {/* Quick Add Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-500 hover:text-white"
                  aria-label={`Add ${item.name} to cart`}
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {item.description}
                </p>

                {/* Bottom row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-amber-600">
                      {formatPrice(item.price)}
                    </span>
                    {item.spicyLevel && item.spicyLevel > 0 && (
                      <span className="flex items-center text-red-500 text-sm">
                        <Flame className="w-4 h-4 mr-1" />
                        {getSpicyLabel(item.spicyLevel)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="text-amber-600 hover:text-amber-700 font-semibold text-sm transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
}
