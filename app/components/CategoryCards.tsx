'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { menuCategories } from '@/app/data/menu';
import { fadeInUp, staggerContainer, staggerItem } from '@/app/lib/animations';

export default function CategoryCards() {
  return (
    <section className="py-20 lg:py-28 bg-gray-900">
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
            className="inline-block text-amber-500 font-semibold text-sm uppercase tracking-wider mb-3"
          >
            Special Offers
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Exclusive Deals
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Save on your favorite Italian dishes with our special promotions and exclusive offers.
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
        >
          {menuCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={staggerItem}
            >
              <Link
                href={`/menu?category=${category.id}`}
                className="group relative block aspect-[4/3] rounded-2xl overflow-hidden"
              >
                {/* Background Image */}
                <Image
                  src={category.image.includes('unsplash') ? category.image + '&fm=webp' : category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  quality={80}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
                  <h3 className="text-white text-lg lg:text-xl font-bold mb-1 group-hover:text-amber-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-300 text-sm hidden sm:block">
                    {category.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
