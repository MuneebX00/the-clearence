"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX / innerWidth;
      const y = clientY / innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate subtle translation based on mouse
  const imgX = (mousePos.x - 0.5) * -20;
  const imgY = (mousePos.y - 0.5) * -20;

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[95vh] min-h-[800px] flex items-end justify-start overflow-hidden bg-forest"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute -inset-10 transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(${imgX}px, ${imgY}px, 0) scale(1.04)` }}
        >
          {/* Verified 1920x1125 ultra-HD official luxury garden room hero photograph */}
          <Image unoptimized 
            src="https://www.crownpavilions.com/Images/pages/garden-rooms/hero.webp" 
            alt="Crown Clarence Luxury Timber Garden Room in landscaped British garden"
            fill
            quality={100}
            priority
            sizes="100vw"
            className="object-cover object-center animate-[kenburns_30s_ease-out_forwards]"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[65vh] bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-1000"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent"></div>
      </div>
      
      <div className="relative z-10 px-8 md:px-16 pb-20 md:pb-32 w-full max-w-7xl reveal active" style={{ transform: `translate3d(${imgX * -0.15}px, ${imgY * -0.15}px, 0)` }}>
        <span className="eyebrow text-ivory/80 mb-6 block drop-shadow-sm">The Art of Garden Living</span>
        <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-serif text-ivory mb-8 leading-[0.85] tracking-tight drop-shadow-2xl">
          The<br/>Clarence
        </h1>
        <p className="text-lg md:text-2xl text-ivory/90 font-light mb-12 max-w-xl font-sans drop-shadow-lg leading-relaxed">
          Contemporary focus, classic proportions. A bespoke sanctuary handcrafted to residential standards.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <a href="#introduction" className="btn-primary bg-ivory text-forest hover:bg-stone shadow-xl border border-transparent">
            Discover The Clarence
          </a>
          <a href="#quote" className="btn-outline-ivory shadow-xl backdrop-blur-sm bg-black/20">
            Request a Quote
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 z-10 hidden sm:flex flex-col items-center gap-4 reveal active opacity-70">
        <div className="w-px h-16 bg-gradient-to-b from-ivory to-transparent animate-pulse"></div>
        <span className="eyebrow text-ivory tracking-[0.3em]">Scroll</span>
      </div>
    </section>
  );
}
