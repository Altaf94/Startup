import type { Metadata } from 'next';
import { CheckoutForm } from '@/app/components';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your order at The Saucy Pan. Enter your delivery details and payment information for fast, fresh Italian food delivery.',
  openGraph: {
    title: 'Checkout | The Saucy Pan',
    description: 'Complete your order at The Saucy Pan. Fast, fresh Italian food delivery.',
    images: ['/og-image.jpg'],
  },
};

export default function CheckoutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
          <p className="text-white/90 mt-2">
            Complete your order details below
          </p>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CheckoutForm />
      </div>
    </div>
  );
}
