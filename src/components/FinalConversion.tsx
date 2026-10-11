"use client";

import React from 'react';
import Image from 'next/image';

export default function FinalConversion() {
  return (
    <section className="relative w-full py-56 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Verified 1920x1280 ultra-HD official luxury garden building sunset perspective */}
        <Image unoptimized 
          src="https://www.crownpavilions.com/Images/shared/secondary-hero.webp" 
          alt="The Clarence luxury garden room evening atmosphere"
          fill
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-forest/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-transparent opacity-90"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto reveal">
        <span className="eyebrow text-ivory/70 mb-10 block drop-shadow tracking-[0.4em]">Your New Space Awaits</span>
        <h2 className="text-6xl md:text-8xl font-serif text-ivory mb-12 drop-shadow-2xl tracking-tight leading-none">Step into the Clarence.</h2>
        <div className="w-px h-24 bg-brass/50 mx-auto mb-16"></div>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center mt-12">
          <a href="#quote" className="btn-primary shadow-2xl scale-105 hover:scale-105">
            Request Formal Quote
          </a>
          <a href="#showsite" className="btn-outline-ivory shadow-xl backdrop-blur-sm bg-black/10 scale-105 hover:scale-105">
            View at a Show Site
          </a>
        </div>
      </div>
    </section>
  );
}
