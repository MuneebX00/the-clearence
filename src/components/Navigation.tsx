"use client";

import React, { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-background/95 backdrop-blur-md border-stone/30 py-4 shadow-sm' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          
          <a href="#" className={`font-serif tracking-widest text-lg font-bold transition-colors duration-500 ${scrolled ? 'text-forest' : 'text-ivory drop-shadow-md'}`}>
            CROWN PAVILIONS
          </a>
          
          <nav className="hidden md:flex items-center gap-10">
            <a href="#introduction" className={`text-xs font-medium uppercase tracking-widest hover:text-brass transition-colors duration-300 ${scrolled ? 'text-forest' : 'text-ivory drop-shadow-sm'}`}>The Clarence</a>
            <a href="#gallery" className={`text-xs font-medium uppercase tracking-widest hover:text-brass transition-colors duration-300 ${scrolled ? 'text-forest' : 'text-ivory drop-shadow-sm'}`}>Gallery</a>
            <a href="#specs" className={`text-xs font-medium uppercase tracking-widest hover:text-brass transition-colors duration-300 ${scrolled ? 'text-forest' : 'text-ivory drop-shadow-sm'}`}>Specifications</a>
            <a href="#configurator" className={`text-xs font-medium uppercase tracking-widest hover:text-brass transition-colors duration-300 ${scrolled ? 'text-forest' : 'text-ivory drop-shadow-sm'}`}>Configurator</a>
          </nav>
          
          <div className="hidden sm:flex items-center gap-6">
            <a href="#showsite" className={`hidden lg:block text-xs font-medium uppercase tracking-widest hover:text-brass transition-colors duration-300 ${scrolled ? 'text-forest' : 'text-ivory drop-shadow-sm'}`}>
              Show Sites
            </a>
            <a href="#quote" className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md ${scrolled ? 'bg-forest text-ivory hover:bg-forest/90' : 'bg-ivory text-forest hover:bg-white'}`}>
              Get a Quote
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 transition-colors focus:outline-none ${scrolled ? 'text-forest' : 'text-ivory'}`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
          
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-forest/95 backdrop-blur-xl flex flex-col justify-center items-center p-8 md:hidden text-center animate-fade-in">
          <nav className="flex flex-col space-y-8 mb-12">
            <a 
              href="#introduction" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif text-ivory hover:text-brass transition-colors"
            >
              The Clarence
            </a>
            <a 
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif text-ivory hover:text-brass transition-colors"
            >
              Lifestyle Gallery
            </a>
            <a 
              href="#configurator" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif text-ivory hover:text-brass transition-colors"
            >
              Design Configurator
            </a>
            <a 
              href="#specs" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif text-ivory hover:text-brass transition-colors"
            >
              Specifications
            </a>
            <a 
              href="#showsite" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif text-ivory hover:text-brass transition-colors"
            >
              Show Sites
            </a>
          </nav>

          <a 
            href="#quote" 
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary bg-ivory text-forest w-full max-w-xs shadow-2xl py-4"
          >
            Request a Quote
          </a>
        </div>
      )}
    </>
  );
}
