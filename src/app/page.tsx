import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Stats } from '@/components/landing/Stats';
import { TemplatesShowcase } from '@/components/landing/TemplatesShowcase';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { Newsletter } from '@/components/landing/Newsletter';
import { CTASection } from '@/components/landing/CTASection';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <TemplatesShowcase />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <CTASection />
      <Footer />
    </div>
  );
}