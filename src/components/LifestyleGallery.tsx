import React from 'react';
import Image from 'next/image';

export default function LifestyleGallery() {
  const images = [
    {
      src: "https://www.crownpavilions.com/Images/uses/garden-office/residential_grade.webp",
      caption: "The Executive Office",
      desc: "A dedicated professional sanctuary away from the main residence with residential-grade insulation."
    },
    {
      src: "https://www.crownpavilions.com/Images/uses/shared/Yoga-Your-View.webp",
      caption: "The Private Retreat",
      desc: "Designed for wellness, relaxation, and quiet contemplation with panoramic garden views."
    },
    {
      src: "https://www.crownpavilions.com/img/storage/v1/object/public/media/cab5d4d8b6e5d151446f8eb9520e174792184380b6c7d20333e9e1b441dcd319.jpg",
      caption: "The Entertainment Lounge",
      desc: "Spacious enough for evening entertaining, ambient lighting, and bespoke media integration."
    },
  ];

  return (
    <section id="gallery" className="py-40 bg-ivory">
      <div className="container mx-auto px-6 max-w-[95%] xl:max-w-screen-2xl">
        <div className="mb-40 reveal">
          <span className="eyebrow block mb-8">Interior Possibilities</span>
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif text-forest leading-tight tracking-tight">A space<br/>for your life.</h2>
        </div>
        
        <div className="space-y-40">
          
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center group reveal">
            <div className="w-full md:w-2/3 overflow-hidden relative aspect-[16/10] shadow-xl bg-stone/20">
              {/* Verified 1290x1070 HD Office */}
              <Image unoptimized src={images[0].src} alt={images[0].caption} fill sizes="(max-width: 768px) 100vw, 70vw" className="object-cover img-hover" />
            </div>
            <div className="w-full md:w-1/3">
              <div className="w-12 h-px bg-brass mb-10"></div>
              <h3 className="font-serif text-4xl text-forest mb-6">{images[0].caption}</h3>
              <p className="text-foreground/60 font-light leading-relaxed text-lg">{images[0].desc}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse gap-16 md:gap-24 items-center group reveal">
            <div className="w-full md:w-7/12 overflow-hidden relative aspect-[4/3] shadow-xl bg-stone/20">
              {/* Verified 1290x1070 HD Retreat */}
              <Image unoptimized src={images[1].src} alt={images[1].caption} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover img-hover" />
            </div>
            <div className="w-full md:w-5/12 md:text-right flex flex-col md:items-end">
              <div className="w-12 h-px bg-brass mb-10"></div>
              <h3 className="font-serif text-4xl text-forest mb-6">{images[1].caption}</h3>
              <p className="text-foreground/60 font-light leading-relaxed max-w-sm text-lg">{images[1].desc}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center group reveal">
            <div className="w-full md:w-full overflow-hidden relative aspect-[21/9] shadow-2xl bg-stone/20">
              {/* Verified 1514x1184 HD Lounge */}
              <Image unoptimized src={images[2].src} alt={images[2].caption} fill sizes="100vw" className="object-cover img-hover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-16 left-12 md:bottom-20 md:left-20">
                <div className="w-12 h-px bg-brass mb-8"></div>
                <h3 className="font-serif text-4xl md:text-6xl text-ivory mb-6 drop-shadow-lg">{images[2].caption}</h3>
                <p className="text-ivory/90 font-light leading-relaxed max-w-lg text-lg drop-shadow-md">{images[2].desc}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
