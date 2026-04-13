'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Tag, Calendar } from 'lucide-react';
import { offers } from '@/app/data/offers';
import { formatDate } from '@/app/lib/utils';
import { fadeInUp, staggerContainer, staggerItem } from '@/app/lib/animations';

export default function OffersPreview() {
  const featuredOffers = offers.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-white">
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
            Special Offers
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Exclusive Deals
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Save on your favorite Italian dishes with our special promotions and exclusive offers.
          </motion.p>
        </motion.div>

        {/* Offers Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredOffers.map((offer) => (
            <motion.div
              key={offer.id}
              variants={staggerItem}
              className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden border border-amber-100 hover:border-amber-300 transition-colors"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-amber-500 text-white font-bold px-4 py-2 rounded-full text-sm">
                  {offer.discount}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {offer.description}
                </p>

                {/* Code & Validity */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-amber-600" />
                    <code className="bg-amber-100 text-amber-700 px-2 py-1 rounded font-mono font-bold">
                      {offer.code}
                    </code>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Until {formatDate(offer.validUntil)}</span>
                  </div>
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
          {/* <Link
            href="/offers"
            className="group inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full transition-all"
          >
            <span>View All Offers</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link> */}
        </motion.div>
      </div>
    </section>
  );
}
