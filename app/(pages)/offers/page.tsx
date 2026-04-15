import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Tag, Calendar, Copy, Check } from 'lucide-react';
import { offers } from '@/app/data/offers';
import { formatDate } from '@/app/lib/utils';
import PastaBowlBuilder from '@/app/components/PastaBowlBuilder';

export const metadata: Metadata = {
  title: 'Make Your Own Bowl',
  description: 'Discover exclusive deals and special offers at The Saucy Pan. Save on your favorite Italian dishes with our current promotions.',
  openGraph: {
    title: 'Make Your Own Bowl',
    description: 'Discover exclusive deals and special offers at The Saucy Pan.',
    images: ['/og-image.jpg'],
  },
};

export default function OffersPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                MAKE YOUR OWN<br />
                <span className="text-amber-400">PASTA BOWL</span>
              </h2>
         
        </div>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="relative h-56">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-amber-500 text-white font-bold px-4 py-2 rounded-full">
                  {offer.discount}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>

                {/* Promo Code */}
                <div className="flex items-center justify-between bg-amber-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-5 h-5 text-amber-600" />
                    <span className="text-sm text-gray-600">Promo Code:</span>
                    <code className="bg-amber-100 text-amber-700 px-3 py-1 rounded font-mono font-bold">
                      {offer.code}
                    </code>
                  </div>
                  <button
                    className="p-2 text-amber-600 hover:bg-amber-100 rounded-full transition-colors"
                    title="Copy code"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>

                {/* Validity */}
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Valid until {formatDate(offer.validUntil)}</span>
                </div>

                {/* Terms */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Terms & Conditions:</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {offer.terms.map((term, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href="/order"
                  className="mt-6 w-full block py-3 text-center bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Order Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Make Your Own Pasta Bowl */}
        <div className="mt-16">
          {/* Hero Banner */}
          <div className="relative bg-gray-900 rounded-3xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f97316 0%, transparent 40%)',
              }}
            />
            <div className="relative px-8 py-12 lg:px-16 lg:py-16 text-center">
             
              <p className="text-gray-300 text-lg max-w-xl mx-auto mb-2">
                Craft your perfect plate, your way.
              </p>
              <p className="text-amber-400 font-semibold text-xl">Starting at Rs. 950</p>
            </div>
          </div>

          <PastaBowlBuilder />
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gray-900 rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Exclusive Offers
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Subscribe to our newsletter and be the first to know about new dishes, 
            special promotions, and exclusive member-only deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
