import React from 'react';
import Image from 'next/image';

export default function ArchitectureInContext() {
  return (
    <section className="w-full py-40 bg-background reveal">
      <div className="container mx-auto px-6 max-w-[95%] xl:max-w-screen-2xl">
        <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group shadow-2xl bg-forest/5">
          {/* Verified 1920x1200 HD landscape image in British garden setting */}
          <Image unoptimized 
            src="https://www.crownpavilions.com/Images/pages/bespoke-garden-rooms/hero.webp" 
            alt="The Clarence situated harmoniously within an expansive British landscaped garden"
            fill
            quality={100}
            sizes="100vw"
            className="object-cover object-center img-hover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20 bg-gradient-to-t from-black/85 via-black/35 to-transparent">
            <p className="text-ivory font-serif text-3xl md:text-5xl max-w-4xl drop-shadow-xl leading-tight">
              Flawless integration with the natural landscape.
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-medium">Architecture in Context</p>
        </div>
      </div>
    </section>
  );
}
