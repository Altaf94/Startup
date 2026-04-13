import type { Metadata } from 'next';
import { OrderTracker } from '@/app/components';

export const metadata: Metadata = {
  title: 'Track Your Order',
  description: 'Track your The Saucy Pan order in real-time. Enter your order ID to see live status updates from preparation to delivery.',
  openGraph: {
    title: 'Track Your Order | The Saucy Pan',
    description: 'Track your The Saucy Pan order in real-time with live status updates.',
    images: ['/og-image.jpg'],
  },
};

export default function TrackingPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Track Your Order
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Enter your order ID below to track your order status in real-time.
          </p>
        </div>
      </div>

      {/* Order Tracker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <OrderTracker />
      </div>
    </div>
  );
}
