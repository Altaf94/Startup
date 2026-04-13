import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Users,
  Clock,
  Leaf,
  Heart,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about The Saucy Pan's story, our passion for authentic Italian cuisine, our expert chefs, and our commitment to quality delivery from our cloud kitchen.",
  openGraph: {
    title: "About Us | The Saucy Pan",
    description:
      "Learn about The Saucy Pan's story, our passion for authentic Italian cuisine, and our commitment to quality.",
    images: ["/og-image.jpg"],
  },
};

const values = [
  {
    icon: Heart,
    title: "Passion",
    description:
      "Every dish is crafted with love and dedication to authentic Italian traditions.",
  },
  {
    icon: Leaf,
    title: "Quality",
    description:
      "We source only the finest ingredients, from local farms and imported Italian specialties.",
  },
  {
    icon: Users,
    title: "Family",
    description:
      "Our restaurant is an extension of our family, and every guest is treated as one.",
  },
  {
    icon: Star,
    title: "Excellence",
    description:
      "We strive for perfection in every bite, every service, and every experience.",
  },
];

const milestones = [
  {
    year: "1999",
    title: "The Beginning",
    description:
      "Chef Marco Rossi opens the first The Saucy Pan cloud kitchen in Downtown Karachi.",
  },
  {
    year: "2005",
    title: "Growing Family",
    description:
      "Second cloud kitchen opens in Uptown, bringing Italian flavors to more New Yorkers.",
  },
  {
    year: "2012",
    title: "Recognition",
    description:
      'Awarded "Best Italian Food Delivery" by NYC Food Critics Association.',
  },
  {
    year: "2018",
    title: "Brooklyn Expansion",
    description:
      "Third cloud kitchen opens in Brooklyn, completing our NYC delivery network.",
  },
  {
    year: "2023",
    title: "Online Ordering",
    description:
      "Launch of our advanced online ordering system for seamless delivery and pickup.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1719239948961-832e6c9fff4b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cloud kitchen interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Story
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            The Saucy Pan was born from a simple belief: pasta should never come
            from convenience. It should come from hands, heart, and heat. Every
            strand is shaped from scratch, crafted with care, never rushed,
            never replicated. Here, pasta is more than food. It’s craft, memory,
            and emotion in every bite. We begin with fresh dough made daily and
            transform it through human hands, using only honest ingredients and
            time-honored process. This is not just pasta on a plate. It’s
            warmth, comfort, and a reminder that the best things are always
            created, never instant.
          </p>
        </div>
      </section>

   
      {/* Team Section */}
      <section className="py-20 lg:py-28 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Mission */}
            <div>
              <span className="inline-block text-amber-500 font-semibold text-sm uppercase tracking-wider mb-3">
                Mission
              </span>

              <p className="text-gray-400 text-lg mb-8">
                At The Saucy Pan, handcrafted pasta is at the heart of
                everything we create. We bring together carefully selected,
                unprocessed ingredients and combine them with precision and care
                to form fresh dough from scratch. Each batch is thoughtfully
                prepared, then shaped by hand into a variety of pasta
                forms crafted exactly the way you want it. This process allows
                us to preserve authenticity, enhance texture, and ensure every
                piece of pasta carries the richness of real, honest ingredients.
              </p>
              <div className="flex items-center space-x-8">
              </div>
            </div>

            {/* Vision */}
            <div>
              <span className="inline-block text-amber-500 font-semibold text-sm uppercase tracking-wider mb-3">
                Vision
              </span>

              <p className="text-gray-400 text-lg mb-8">
                Our vision is to redefine modern pasta dining through a balance of artisanal techniques and contemporary convenience. We aim to be recognized for our commitment to craftsmanship, ingredient integrity, and delivering elevated, freshly prepared meals with every order
              </p>
              <div className="flex items-center space-x-8">
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Experience The Saucy Pan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Experience The Saucy Pan for an unforgettable Italian dining
            experience, or order online and bring the taste of Italy to your
            home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/order"
              className="group inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full transition-all"
            >
              <span>Order Online</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-full transition-all"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
