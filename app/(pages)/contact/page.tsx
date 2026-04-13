import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { ContactForm } from '@/app/components';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Saucy Pan. Send us a message, call us, or reach out via WhatsApp. We\'d love to hear from you!',
  openGraph: {
    title: 'Contact Us | The Saucy Pan',
    description: 'Get in touch with The Saucy Pan. Contact information and customer service.',
    images: ['/og-image.jpg'],
  },
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have a question, feedback, or special request?
            We&apos;d love to hear from you!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Contact</h3>
              <div className="space-y-4">
                <a
                  href="tel:+12125550100"
                  className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <p className="font-medium">(212) 555-0100</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/12125550100?text=Hi%20The%20Saucy%20Pan!%20I%20would%20like%20to%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp Order</p>
                    <p className="font-medium">(212) 555-0100</p>
                  </div>
                </a>
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hours</p>
                    <p className="font-medium">Sat-Sun: 1PM - 10:00PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            {/* <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Delivery Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Delivery Zone</p>
                    <p className="text-sm text-gray-600">Manhattan, Brooklyn, Queens (within 5 miles)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Delivery Time</p>
                    <p className="text-sm text-gray-600">30-45 minutes</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-green-600">Free delivery</span> on orders over $40
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Minimum order: $25
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
