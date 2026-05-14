import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/app/lib/cart-context";
import { LocationProvider } from "@/app/lib/location-context";
import { Header, Footer, CartDrawer, BackgroundMusic } from "@/app/components";

const siteUrl = "https://www.thesaucypan.com";
const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || "a7a990dd-02e8-4d63-bf78-0f75cc879629";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Saucy Pan | Authentic Italian Pasta",
    template: "%s | The Saucy Pan",
  },
  description:
    "Experience authentic Italian cuisine from The Saucy Pan. Fresh handmade pasta, traditional recipes, delivered fresh to your door. Order online for delivery or pickup.",
  keywords: [
    "pasta delivery",
    "Karachi Italian food",
    "authentic Italian",
    "handmade pasta",
    "Italian food delivery",
    "best pasta Karachi",
  ],
  authors: [{ name: "The Saucy Pan" }],
  creator: "The Saucy Pan",
  publisher: "The Saucy Pan",
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo.png", type: "image/png" },
    ],
    shortcut: "/images/logo.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "The Saucy Pan",
    title: "The Saucy Pan | Authentic Italian Pasta",
    description:
      "Experience authentic Italian cuisine from The Saucy Pan. Fresh handmade pasta, traditional recipes, delivered fresh to your door.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Saucy Pan - Authentic Italian Pasta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Saucy Pan | Authentic Italian Pasta",
    description:
      "Experience authentic Italian cuisine from The Saucy Pan. Fresh handmade pasta, traditional recipes, delivered fresh to your door.",
    images: ["/og-image.jpg"],
    creator: "@thesaucypan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="The Saucy Pan" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Schema.org markup for restaurant */}
        <Script
          id="restaurant-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              name: "The Saucy Pan",
              image: `${siteUrl}/og-image.jpg`,
              url: siteUrl,
              telephone: "+92-337-3594376",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Main Street",
                addressLocality: "New York",
                addressRegion: "NY",
                postalCode: "10001",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 40.7128,
                longitude: -74.006,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Saturday",
                  "Sunday",
                ],
                opens: "13:00",
                closes: "00:00",
              },
              servesCuisine: "Italian",
              priceRange: "$$",
              acceptsReservations: "False",
              hasDeliveryService: "True",
              hasPickupService: "True",
              menu: `${siteUrl}/menu`,
            }),
          }}
        />
        <Script
          id="onesignal-sdk"
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
        />
        {oneSignalAppId ? (
          <Script
            id="onesignal-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.OneSignalDeferred = window.OneSignalDeferred || [];
                window.OneSignalDeferred.push(async function(OneSignal) {
                  await OneSignal.init({
                    appId: ${JSON.stringify(oneSignalAppId)},
                    allowLocalhostAsSecureOrigin: true,
                  });
                });
              `,
            }}
          />
        ) : null}
        
        {/* Security Initialization */}
        <Script
          id="security-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Disable right-click context menu
                document.addEventListener('contextmenu', (e) => {
                  e.preventDefault();
                  return false;
                });

                // Disable keyboard shortcuts for developer tools
                document.addEventListener('keydown', (e) => {
                  if (e.key === 'F12' || 
                      ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') ||
                      ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') ||
                      ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') ||
                      ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K')) {
                    e.preventDefault();
                    return false;
                  }
                });

                // Disable console methods
                const noop = () => {};
                window.console.log = noop;
                window.console.debug = noop;
                window.console.info = noop;
                window.console.warn = noop;
                window.console.error = noop;
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900">
        <BackgroundMusic />
        <CartProvider>
            <LocationProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
            </LocationProvider>
        </CartProvider>
      </body>
    </html>
  );
}
