'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { branchLocations } from '@/app/data/locations';
import { fadeInUp, staggerContainer, staggerItem } from '@/app/lib/animations';

export default function LocationsPreview() {
  return (
    <section className="py-20 lg:py-28 bg-stone-100">
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
            Pickup Locations
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Find a Pickup Point
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Pick up your fresh Italian pasta from one of our convenient cloud kitchen locations. 
            No dine-in, just delicious takeout and delivery.
          </motion.p>
        </motion.div>

        {/* Locations Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {branchLocations.map((location) => (
            <motion.div
              key={location.id}
              variants={staggerItem}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {location.name}
              </h3>
              
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{location.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <a
                    href={`tel:${location.phone}`}
                    className="text-sm hover:text-amber-600 transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{location.hours}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={`https://maps.google.com/?q=${location.coordinates.lat},${location.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
                >
                  Get Directions
                </a>
                <span className="text-sm text-gray-500 font-medium">
                  Pickup Only
                </span>
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
            href="/contact"
            className="group inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
          >
            <span>View All Locations</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
