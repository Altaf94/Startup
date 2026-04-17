'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Clock, Phone } from 'lucide-react';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/app/lib/animations';

export default function CTASection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=1920&q=80&fm=webp"
          alt="Delicious Italian food"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/95 via-amber-600/90 to-orange-600/95" />
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-0 left-0 w-72 h-72 bg-orange-300 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Hungry? Order Now!
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-white/90 text-xl max-w-2xl mx-auto mb-10"
          >
          Experience our artisanal pasta, crafted for you, with a story of flavor in every bite.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/order"
              className="group inline-flex items-center space-x-2 bg-white hover:bg-gray-100 text-amber-600 font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              <span>Order Online</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center space-x-2 bg-transparent hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full border-2 border-white transition-all"
            >
              <span>View Menu</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
