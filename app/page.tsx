import {
  Hero,
  VideoSection,
  FeaturedDishes,
  CategoryCards,
  AboutPreview,
  Testimonials,
  OffersPreview,
  CTASection,
} from '@/app/components';

export default function Home() {
  return (
    <>
      {/* Hero Section with animated headline and CTAs */}
      <Hero />
      
      {/* Video Section - Homemade Pasta Journey */}
      <VideoSection />
      
      {/* Featured Dishes - Chef's selections */}
      <FeaturedDishes />
      
      {/* About Preview - Our story teaser */}
      <AboutPreview />
      
      {/* Category Cards - Browse by category */}
      <OffersPreview />
      
      {/* Testimonials - Customer reviews */}
      {/* <Testimonials /> */}
      
      {/* CTA Section - Order now banner */}
      <CTASection />
    </>
  );
}
