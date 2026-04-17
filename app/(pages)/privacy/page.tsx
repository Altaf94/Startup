import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how The Saucy Pan collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
  openGraph: {
    title: 'Privacy Policy | The Saucy Pan',
    description: 'Learn how The Saucy Pan collects, uses, and protects your personal information.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/90">
            Last updated: January 1, 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Privacy Policy</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            At THE SAUCY PAN, we respect your privacy and are committed to protecting your personal information.
          </p>

          <ul className="space-y-3 ml-6">
            <li className="text-gray-700 leading-relaxed">• We collect basic customer details such as name, contact number, address, and order preferences for order processing and delivery.</li>
            <li className="text-gray-700 leading-relaxed">• Your information is used only for order fulfillment, communication, and service improvement.</li>
            <li className="text-gray-700 leading-relaxed">• We do not sell, share, or distribute your personal data to third parties.</li>
            <li className="text-gray-700 leading-relaxed">• Payment details (if applicable) are handled securely through trusted platforms.</li>
            <li className="text-gray-700 leading-relaxed">• By placing an order, you consent to our data usage for service purposes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
