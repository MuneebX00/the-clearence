import React from 'react';
import Image from 'next/image';

export default function Craftsmanship() {
  return (
    <section className="py-40 bg-forest text-ivory overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 z-0"></div>
      <div className="container mx-auto px-6 max-w-[95%] xl:max-w-screen-2xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-center">
          
          <div className="order-2 lg:order-1 reveal">
            <span className="eyebrow text-ivory/60 block mb-12">British Craftsmanship</span>
            <h2 className="text-5xl md:text-6xl xl:text-[5rem] font-serif text-ivory mb-12 leading-[1.05] tracking-tight">
              Uncompromising materiality.
            </h2>
            
            <p className="text-lg md:text-xl text-ivory/70 mb-16 leading-relaxed font-light max-w-lg">
              Every Crown Clarence is meticulously handcrafted in our Oxfordshire workshops. We source only FSC® certified premium timber, ensuring absolute architectural integrity.
            </p>
            
            <div className="w-full h-px bg-ivory/20 mb-16"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] font-medium text-brass mb-6">Premium Joinery</h3>
                <p className="text-ivory/60 font-light text-sm leading-relaxed">Hand-finished timber elements and precise architectural detailing.</p>
              </div>
              <div>
                <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] font-medium text-brass mb-6">Thermal Efficiency</h3>
                <p className="text-ivory/60 font-light text-sm leading-relaxed">High-performance double glazing and foil-backed insulation for year-round comfort.</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative group reveal reveal-delay-1">
            <div className="overflow-hidden aspect-[3/4] shadow-2xl relative">
              <Image unoptimized 
                src="https://www.crownpavilions.com/Images/pages/about/craftsmanship.webp" 
                alt="Premium timber craftsmanship detail"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale-[40%] img-hover mix-blend-luminosity opacity-90"
              />
            </div>
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 bg-background text-forest p-12 shadow-2xl hidden md:block">
              <span className="font-serif text-6xl">10</span>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold mt-4">Year<br/>Guarantee</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
