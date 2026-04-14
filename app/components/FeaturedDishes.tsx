'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Plus, Flame } from 'lucide-react';
import { featuredDishes } from '@/app/data/menu';
import { useCart } from '@/app/lib/cart-context';
import { formatPrice, getSpicyLabel, cn } from '@/app/lib/utils';
import { fadeInUp, staggerContainer, staggerItem } from '@/app/lib/animations';

export default function FeaturedDishes() {
  const { addItem, openCart } = useCart();

  const handleAddToCart = (item: typeof featuredDishes[0]) => {
    addItem(item);
    openCart();
  };

  return (
    <section className="py-20 lg:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3"
          >
            Chef&apos;s Selection
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Signature Dishes
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Discover our most beloved creations, crafted with passion and the finest ingredients 
            from Italy and local farms.
          </motion.p>
        </motion.div>

        {/* Dishes Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredDishes.map((dish) => (
            <motion.div
              key={dish.id}
              variants={staggerItem}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden flex-shrink-0">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {dish.isPopular && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                  {dish.isNew && (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
                {/* Quick Add Button */}
                <button
                  onClick={() => handleAddToCart(dish)}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-500 hover:text-white"
                  aria-label={`Add ${dish.name} to cart`}
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-2">
                  {dish.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {dish.description}
                </p>

                {/* Bottom row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-amber-600">
                      {formatPrice(dish.price)}
                    </span>
                    {dish.spicyLevel && dish.spicyLevel > 0 && (
                      <span className="flex items-center text-red-500 text-sm">
                        <Flame className="w-4 h-4 mr-1" />
                        {getSpicyLabel(dish.spicyLevel)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(dish)}
                    className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/menu"
            className="group inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-full transition-all"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
