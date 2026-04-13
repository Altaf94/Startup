'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/app/data/testimonials';
import { fadeInUp, staggerContainer, staggerItem } from '@/app/lib/animations';
import { formatDate } from '@/app/lib/utils';

export default function Testimonials() {
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
            Testimonials
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            What Our Guests Say
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Don&apos;t just take our word for it. Here&apos;s what our valued customers 
            have to say about their The Saucy Pan experience.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.slice(0, 6).map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={staggerItem}
              className="bg-stone-50 rounded-2xl p-6 lg:p-8 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-amber-200" />

              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.comment}&rdquo;
              </p>

              {/* Dish Mention */}
              {testimonial.dish && (
                <p className="text-sm text-amber-600 font-medium mb-4">
                  Ordered: {testimonial.dish}
                </p>
              )}

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formatDate(testimonial.date)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-gray-900">4.9</span>
              <span>Average Rating</span>
            </div>
            <div className="text-gray-300">|</div>
            <div>
              <span className="font-semibold text-gray-900">2,500+</span>
              <span> Happy Customers</span>
            </div>
            <div className="text-gray-300">|</div>
            <div>
              <span className="font-semibold text-gray-900">50K+</span>
              <span> Orders Delivered</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
