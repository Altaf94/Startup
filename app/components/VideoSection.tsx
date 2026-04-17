'use client';

import { motion } from 'framer-motion';
import { Play, ChefHat, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '@/app/lib/animations';

const videos = [
  {
    id: 1,
    title: 'Fresh Pasta Making',
    description: 'Watch our chefs hand-roll fresh pasta dough',
    src: '/images/Video1.mp4',
    poster: '/images/pasta-making-1.jpg',
  },
  {
    id: 2,
    title: 'Sauce Preparation',
    description: 'Authentic Italian sauce recipes from scratch',
    src: '/images/Video 2.mp4',
    poster: '/images/sauce-prep-2.jpg',
  },
  {
    id: 3,
    title: 'Traditional Cooking',
    description: 'Time-honored techniques passed down through generations',
    src: '/images/video 3.mp4',
    poster: '/images/traditional-cooking-3.jpg',
  },
  {
    id: 4,
    title: 'Final Assembly',
    description: 'Putting it all together for perfection',
    src: '/images/Video 4.mp4',
    poster: '/images/final-assembly-4.jpg',
  },
];

export default function VideoSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3"
          >
            Behind the Scenes
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Handcrafted Pasta Journey
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
           
          </motion.p>
        </motion.div>

        {/* Clean Video Showcase */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              variants={staggerItem}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-amber-100 hover:border-amber-300">

                <div className="aspect-[4/5] relative overflow-hidden">
                  <video
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    poster={video.poster}
                    controls
                    preload="metadata"
                    playsInline
                    autoPlay
                    muted
                    loop
                  >
                    <source src={video.src} type="video/mp4" />
                    <source src={video.src} type="video/x-m4v" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Fallback for video loading errors */}
                  <div className="video-fallback absolute inset-0 bg-gray-100 flex items-center justify-center hidden">
                    <div className="text-center p-4">
                      <ChefHat className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">Video coming soon</p>
                      <p className="text-gray-400 text-xs mt-1">{video.title}</p>
                    </div>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur-md rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl">
                      <Play className="w-8 h-8 text-amber-600" />
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-6 h-6 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 bg-amber-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}