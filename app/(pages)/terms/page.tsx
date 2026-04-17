import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms of Service, Privacy Policy, Return & Refund Policy, and Shipping Policy for The Saucy Pan. Understand our service policies and your rights.',
  openGraph: {
    title: 'Terms & Conditions | The Saucy Pan',
    description: 'Review our complete terms, policies, and conditions for using The Saucy Pan\'s services.',
  },
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-white/90">
            Last updated: January 1, 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          {/* Section 1: Privacy Policy */}
          <div className="mb-10 pb-10 border-b-2 border-gray-200">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">1. Privacy Policy</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At THE SAUCY PAN, we respect your privacy and are committed to protecting your personal information.
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 leading-relaxed">• We collect basic customer details such as name, contact number, address, and order preferences for order processing and delivery.</li>
              <li className="text-gray-700 leading-relaxed">• Your information is used only for order fulfillment, communication, and service improvement.</li>
              <li className="text-gray-700 leading-relaxed">• We do not sell, share, or distribute your personal data to third parties.</li>
              <li className="text-gray-700 leading-relaxed">• Payment details (if applicable) are handled securely through trusted platforms.</li>
              <li className="text-gray-700 leading-relaxed">• By placing an order, you consent to our data usage for service purposes.</li>
            </ul>
          </div>

          {/* Section 2: Return & Refund Policy */}
          <div className="mb-10 pb-10 border-b-2 border-gray-200">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">2. Return & Refund Policy</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Due to the fresh, made-to-order nature of our handmade pasta:
            </p>
            <ul className="space-y-2 ml-6 mb-6">
              <li className="text-gray-700 leading-relaxed">• Orders cannot be returned or refunded once prepared and dispatched.</li>
            </ul>

            <h3 className="text-xl font-semibold text-amber-800 mb-3">Refunds or Replacements Available If:</h3>
            <ul className="space-y-2 ml-6 mb-6">
              <li className="text-gray-700 leading-relaxed">• Wrong item was delivered</li>
              <li className="text-gray-700 leading-relaxed">• Order is damaged/spoiled upon arrival</li>
            </ul>

            <h3 className="text-xl font-semibold text-amber-800 mb-3">Complaint Process:</h3>
            <ul className="space-y-2 ml-6 mb-6">
              <li className="text-gray-700 leading-relaxed">• Complaints must be reported within 1 hour of delivery with clear photo evidence.</li>
            </ul>

            <h3 className="text-xl font-semibold text-amber-800 mb-3">Approved Cases May Receive:</h3>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 leading-relaxed">• Replacement meal OR</li>
              <li className="text-gray-700 leading-relaxed">• Partial/full refund (case dependent)</li>
            </ul>
          </div>

          {/* Section 3: Shipping / Service Policy */}
          <div className="mb-10 pb-10 border-b-2 border-gray-200">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">3. Shipping / Service Policy</h2>
            
            <h3 className="text-xl font-semibold text-amber-800 mb-3">Operating Hours & Delivery:</h3>
            <ul className="space-y-2 ml-6 mb-6">
              <li className="text-gray-700 leading-relaxed">• We operate as a pre-order & limited availability kitchen.</li>
              <li className="text-gray-700 leading-relaxed">• Delivery days: Saturday & Sunday</li>
              <li className="text-gray-700 leading-relaxed">• Timings: 12:00 PM – 10:00 PM</li>
              <li className="text-gray-700 leading-relaxed">• Orders must be placed in advance (minimum 3–4 hours prior)</li>
              <li className="text-gray-700 leading-relaxed">• Delivery charges: Based on location (Karachi-wide delivery)</li>
            </ul>

            <h3 className="text-xl font-semibold text-amber-800 mb-3">Our Commitments:</h3>
            <ul className="space-y-2 ml-6 mb-6">
              <li className="text-gray-700 leading-relaxed">• Fresh preparation per order</li>
              <li className="text-gray-700 leading-relaxed">• Hygienic packaging</li>
              <li className="text-gray-700 leading-relaxed">• Timely dispatch</li>
            </ul>

            <p className="text-sm italic text-gray-600 ml-6 bg-gray-50 p-4 rounded">
              Note: Delivery delays due to traffic, weather, or rider issues may occur.
            </p>
          </div>

          {/* Section 4: Terms & Conditions */}
          <div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">4. Terms & Conditions</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              By ordering from THE SAUCY PAN, you agree to the following:
            </p>
            <ul className="space-y-2 ml-6 mb-6">
              <li className="text-gray-700 leading-relaxed">• All items are freshly handcrafted, slight variations may occur.</li>
              <li className="text-gray-700 leading-relaxed">• Orders once confirmed cannot be cancelled last-minute.</li>
              <li className="text-gray-700 leading-relaxed">• Prices are subject to change without prior notice.</li>
            </ul>

            <h3 className="text-xl font-semibold text-amber-800 mb-3">We Reserve the Right to:</h3>
            <ul className="space-y-2 ml-6 mb-6">
              <li className="text-gray-700 leading-relaxed">• Refuse service in case of misuse or inappropriate behavior</li>
              <li className="text-gray-700 leading-relaxed">• Modify menu items based on ingredient availability</li>
            </ul>

            <h3 className="text-xl font-semibold text-amber-800 mb-3">Your Responsibilities:</h3>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 leading-relaxed">• Customers are responsible for providing accurate delivery details.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
