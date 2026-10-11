"use client";

import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProductIntroduction from '@/components/ProductIntroduction';
import ArchitectureInContext from '@/components/ArchitectureInContext';
import ArchitecturalShowcase from '@/components/ArchitecturalShowcase';
import LifestyleGallery from '@/components/LifestyleGallery';
import Craftsmanship from '@/components/Craftsmanship';
import Configurator from '@/components/Configurator';
import TechnicalSpecifications from '@/components/TechnicalSpecifications';
import RelatedProducts from '@/components/RelatedProducts';
import HowItWorks from '@/components/HowItWorks';
import QuoteSection from '@/components/QuoteSection';
import ShowsiteVisit from '@/components/ShowsiteVisit';
import TrustAndReassurance from '@/components/TrustAndReassurance';
import FAQs from '@/components/FAQs';
import FinalConversion from '@/components/FinalConversion';
import Footer from '@/components/Footer';
import useReveal from '@/hooks/useReveal';

export default function Home() {
  useReveal();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-forest selection:text-ivory overflow-x-hidden">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <ProductIntroduction />
        <ArchitectureInContext />
        <ArchitecturalShowcase />
        <LifestyleGallery />
        <Craftsmanship />
        <Configurator />
        <TechnicalSpecifications />
        <RelatedProducts />
        <HowItWorks />
        <QuoteSection />
        <ShowsiteVisit />
        <TrustAndReassurance />
        <FAQs />
        <FinalConversion />
      </main>
      <Footer />
    </div>
  );
}
