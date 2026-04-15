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
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            The Saucy Pan (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your 
            information when you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide when you:</p>
          <ul>
            <li>Place an order online or by phone</li>
            <li>Create an account on our website</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us with inquiries or feedback</li>
            <li>Make a reservation</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name, email address, and phone number</li>
            <li>Delivery address</li>
            <li>Payment information (processed securely by our payment providers)</li>
            <li>Order history and preferences</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>
            When you access our website, we may automatically collect certain information, including:
          </p>
          <ul>
            <li>Device and browser type</li>
            <li>IP address and location data</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website or link</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information for various purposes:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about orders, promotions, and updates</li>
            <li>Improve our website, services, and customer experience</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Detect and prevent fraud</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul>
            <li>Service providers who assist in our operations (payment processors, delivery partners)</li>
            <li>Law enforcement when required by law</li>
            <li>Business partners for joint promotions (with your consent)</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. 
            However, no method of transmission over the Internet is 100% secure, and we cannot 
            guarantee absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent where processing is based on consent</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience on our website. 
            You can manage your cookie preferences through your browser settings.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our services are not intended for children under 13 years of age. We do not 
            knowingly collect personal information from children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any 
            changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@bellapasta.com</li>
            <li>Phone: 0337 3594376</li>
            <li>Address: 123 Main Street, Downtown, NY 10001</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
