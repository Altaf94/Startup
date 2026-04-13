import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using The Saucy Pan\'s website and services. Understand your rights and responsibilities.',
  openGraph: {
    title: 'Terms of Service | The Saucy Pan',
    description: 'Read the terms and conditions for using The Saucy Pan\'s website and services.',
  },
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-white/90">
            Last updated: January 1, 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 prose prose-lg max-w-none">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using The Saucy Pan&apos;s website and services, you agree to be bound 
            by these Terms of Service. If you do not agree to these terms, please do not use 
            our services.
          </p>

          <h2>Use of Our Services</h2>
          <h3>Eligibility</h3>
          <p>
            You must be at least 18 years old or have parental consent to use our services. 
            By using our services, you represent that you meet these requirements.
          </p>

          <h3>Account Responsibilities</h3>
          <p>If you create an account, you are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>

          <h2>Orders and Payments</h2>
          <h3>Placing Orders</h3>
          <p>
            When you place an order through our website or app, you are making an offer to 
            purchase the selected items. We reserve the right to accept or decline any order 
            for any reason.
          </p>

          <h3>Pricing</h3>
          <p>
            All prices are listed in US dollars and are subject to change without notice. 
            Prices do not include applicable taxes and delivery fees, which will be added 
            at checkout.
          </p>

          <h3>Payment</h3>
          <p>
            We accept various payment methods including credit cards, debit cards, digital 
            wallets, and cash on delivery for eligible orders. Payment must be received 
            before your order is processed.
          </p>

          <h2>Delivery and Pickup</h2>
          <h3>Delivery</h3>
          <ul>
            <li>Delivery times are estimates and may vary based on demand and conditions</li>
            <li>We deliver within a 5-mile radius of our locations</li>
            <li>Delivery fee applies for orders under $40</li>
            <li>You are responsible for providing accurate delivery information</li>
          </ul>

          <h3>Pickup</h3>
          <p>
            Pickup orders should be collected within 30 minutes of the estimated ready time. 
            Uncollected orders may be disposed of, and no refund will be provided.
          </p>

          <h2>Cancellations and Refunds</h2>
          <p>
            Orders may be cancelled within 5 minutes of placement. After this window, the 
            kitchen may have already begun preparation, and cancellation may not be possible.
          </p>
          <p>Refunds may be issued at our discretion for:</p>
          <ul>
            <li>Incorrect orders</li>
            <li>Quality issues reported within 24 hours</li>
            <li>Non-delivery (verified by our records)</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All content on our website, including text, images, logos, and graphics, is the 
            property of The Saucy Pan and is protected by copyright and trademark laws. You may 
            not use, reproduce, or distribute our content without permission.
          </p>

          <h2>User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our services for any unlawful purpose</li>
            <li>Interfere with or disrupt our services</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Submit false or misleading information</li>
            <li>Harass, abuse, or harm others through our platform</li>
          </ul>

          <h2>Disclaimers</h2>
          <p>
            Our services are provided &quot;as is&quot; without warranties of any kind. We do not 
            guarantee that our services will be uninterrupted, error-free, or meet your 
            specific requirements.
          </p>

          <h3>Food Allergens</h3>
          <p>
            While we take precautions to prevent cross-contamination, our kitchen handles 
            common allergens including gluten, dairy, eggs, nuts, and shellfish. If you have 
            severe allergies, please contact us before ordering.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, The Saucy Pan shall not be liable for any 
            indirect, incidental, special, consequential, or punitive damages arising from 
            your use of our services.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless The Saucy Pan, its officers, directors, 
            employees, and agents from any claims, damages, or expenses arising from your 
            violation of these terms or misuse of our services.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of 
            the State of New York, without regard to its conflict of law provisions.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of our 
            services after changes constitutes acceptance of the modified terms.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about these Terms of Service, please contact us at:
          </p>
          <ul>
            <li>Email: legal@bellapasta.com</li>
            <li>Phone: (212) 555-0100</li>
            <li>Address: 123 Main Street, Downtown, NY 10001</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
