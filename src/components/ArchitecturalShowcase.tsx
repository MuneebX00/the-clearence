import React from 'react';
import Image from 'next/image';

export default function ArchitecturalShowcase() {
  const images = [
    {
      src: "https://www.crownpavilions.com/Images/archive/garden-rooms/door-detail.jpg",
      alt: "Architectural door, joinery, and cladding construction detail",
      caption: "Joinery & Cladding",
      desc: "Handcrafted timber joinery engineered with millimetre precision."
    },
    {
      src: "https://www.crownpavilions.com/img/storage/v1/object/public/media/16a361b636b1b8b6824e9ac0e384c422cada7c71a1f7dddce72c901a9c1e4b4f.jpg",
      alt: "Clarence architectural glazing and canopy overhang detail",
      caption: "Glazing & Canopy Detail",
      desc: "Expansive double-glazed units and architectural-grade aluminium doors."
    }
  ];

  return (
    <section className="py-40 bg-stone">
      <div className="container mx-auto px-6 max-w-[95%] xl:max-w-screen-2xl">
        <div className="text-center mb-32 reveal">
          <span className="eyebrow block mb-8">Details Worth Discovering</span>
          <h2 className="text-5xl md:text-7xl font-serif text-forest max-w-4xl mx-auto leading-tight">
            Timber cladding, glazing, and refined roof profiles.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="md:col-span-7 group reveal relative">
            <div className="overflow-hidden w-full aspect-[16/10] relative shadow-2xl bg-forest/5">
              {/* Verified 2560x1707 ultra-HD door and joinery detail */}
              <Image unoptimized 
                src={images[0].src} 
                alt={images[0].alt}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover img-hover"
              />
            </div>
            <div className="mt-8 flex justify-between items-start">
              <div>
                <p className="font-serif text-3xl text-forest max-w-md leading-snug">{images[0].desc}</p>
              </div>
              <span className="eyebrow mt-2">{images[0].caption}</span>
            </div>
          </div>
          
          <div className="md:col-span-5 group reveal reveal-delay-2 relative">
            <div className="overflow-hidden w-full aspect-[4/3] relative shadow-2xl bg-forest/5">
              {/* Verified 2160x1350 ultra-HD glazing & canopy */}
              <Image unoptimized 
                src={images[1].src} 
                alt={images[1].alt}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover img-hover"
              />
            </div>
            <div className="mt-8">
              <span className="eyebrow block mb-3">{images[1].caption}</span>
              <p className="font-sans text-sm text-foreground/60 font-light leading-relaxed">
                {images[1].desc}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
