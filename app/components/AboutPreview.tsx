'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChefHat, Zap, Heart, Star, Award } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '@/app/lib/animations';

const timelineSteps = [];

export default function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-amber-50 to-orange-50">
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
            The Art of Pasta Making
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            From Dough to
            <span className="text-amber-600"> Perfection</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Experience our meticulous 5-step process that transforms simple ingredients
            into extraordinary pasta dishes.
          </motion.p>
        </motion.div>

        {/* Timeline */}
       
          <div className="max-w-2xl mx-auto ">
            <Image
              src="/images/Timeline.png"
              alt="Pasta Making Timeline"
              width={800}
              height={600}
              loading="lazy"
              quality={85}
              className="mx-auto block w-full h-auto"
            />
          </div>

      </div>
    </section>
  );
}
