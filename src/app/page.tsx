import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { TemplatesShowcase } from '@/components/landing/TemplatesShowcase';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Newsletter } from '@/components/landing/Newsletter';
import { CTASection } from '@/components/landing/CTASection';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <TemplatesShowcase />
      <HowItWorks />
      <Newsletter />
      <CTASection />
      <Footer />
    </div>
  );
}