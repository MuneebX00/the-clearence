import React from 'react';
import Image from 'next/image';

export default function ProductIntroduction() {
  return (
    <section id="introduction" className="py-40 bg-background overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-[95%] xl:max-w-screen-2xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 xl:gap-32 items-center">
          
          <div className="lg:w-5/12 reveal relative z-10 pl-4 md:pl-12">
            <span className="eyebrow block mb-12">A New Perspective</span>
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-serif mb-12 text-forest leading-[1.1] tracking-tight">
              Design, space, and the relationship between building and garden.
            </h2>
            
            <p className="text-lg md:text-xl text-foreground/70 mb-16 leading-relaxed font-light max-w-lg">
              The Crown Clarence serves perfectly as a luxury garden office, a tranquil retreat, or a versatile outdoor living space. Engineered to exacting residential standards, it establishes a commanding yet harmonious presence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-12 pt-12 border-t border-stone">
              <div>
                <p className="text-4xl font-serif text-forest mb-2">From £33,800</p>
                <p className="text-xs text-foreground/50 uppercase tracking-widest font-medium">Incl. Delivery & Installation</p>
              </div>
              <div>
                <a href="#configurator" className="text-xs font-bold uppercase tracking-[0.2em] text-brass border-b border-brass pb-1 hover:text-forest hover:border-forest transition-colors">
                  Design Yours
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:w-7/12 relative reveal reveal-delay-1 group">
            {/* Verified 1600x900 official Clarence exterior architecture */}
            <div className="relative aspect-[16/11] overflow-hidden shadow-2xl bg-forest/5">
              <Image unoptimized 
                src="https://www.crownpavilions.com/Images/cards/clarence.webp" 
                alt="Crown Clarence signature architectural exterior with open bifold doors"
                fill
                quality={100}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center img-hover"
              />
            </div>
            
            <div className="absolute -bottom-10 -left-10 bg-ivory p-8 md:p-12 shadow-2xl max-w-sm hidden md:block reveal reveal-delay-2 z-20 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700 ease-out border border-stone/50">
              <div className="w-8 h-px bg-brass mb-4"></div>
              <p className="font-serif text-xl text-forest leading-snug">
                "An architectural form that respects its natural surroundings."
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
