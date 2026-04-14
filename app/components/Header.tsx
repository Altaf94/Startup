'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Phone, MapPin } from 'lucide-react';
import { useCart } from '@/app/lib/cart-context';
import { useLocation } from '@/app/lib/location-context';
import LocationModal from './LocationModal';
import { cn } from '@/app/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/order', label: 'Order Online' },
  { href: '/offers', label: 'Offers' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, openCart } = useCart();
  const { selectedLocation, openModal } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <span
                className={cn(
                  'bg-white rounded-xl p-1 md:p-2 shadow-md flex items-center',
                  isScrolled ? 'shadow' : 'shadow-lg'
                )}
                style={{ lineHeight: 0 }}
              >
                <img
                  src="/images/logo.jpeg"
                  alt="The Saucy Pan Logo"
                  className={cn(
                    'h-16 w-auto md:h-24 transition-all duration-300',
                    isScrolled ? 'drop-shadow-none' : 'drop-shadow-lg'
                  )}
                  style={{ maxWidth: '260px' }}
                />
              </span>
              <span className="sr-only">The Saucy Pan</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-amber-500',
                    isScrolled ? 'text-gray-700' : 'text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Location Button - Desktop Only */}
              <button
                onClick={openModal}
                className={cn(
                  'hidden md:flex items-center space-x-2 text-sm font-medium transition-colors px-3 py-2 rounded-lg',
                  isScrolled
                    ? 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                    : 'text-white hover:bg-white/20'
                )}
              >
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-xs opacity-75">Change Location</span>
                  <span className="font-semibold truncate max-w-[120px]">
                    {selectedLocation || 'Select Location'}
                  </span>
                </span>
              </button>

              {/* Phone Number - Desktop Only */}
              <a
                href="tel:+12125550100"
                className={cn(
                  'hidden md:flex items-center space-x-2 text-sm font-medium transition-colors',
                  isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'
                )}
              >
                <Phone className="w-4 h-4" />
                <span>(212) 555-0100</span>
              </a>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className={cn(
                  'relative p-2 rounded-full transition-colors',
                  isScrolled
                    ? 'text-gray-700 hover:bg-amber-100'
                    : 'text-white hover:bg-white/20'
                )}
                aria-label="Open cart"
              >
                <ShoppingBag className="w-6 h-6" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  'lg:hidden p-2 rounded-md transition-colors',
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/20'
                )}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white shadow-xl z-50 lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-2xl font-bold font-serif text-amber-700">
                    The Saucy Pan
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 text-lg font-medium text-gray-700 hover:text-amber-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link
                    href="/order"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-3 px-6 text-center bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    Order Now
                  </Link>
                  <a
                    href="tel:+12125550100"
                    className="flex items-center justify-center space-x-2 mt-4 py-3 text-amber-700 font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    <span>(212) 555-0100</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Location Modal */}
      <LocationModal />
    </>
  );
}
