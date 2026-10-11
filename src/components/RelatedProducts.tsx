import React from 'react';
import Image from 'next/image';

export default function RelatedProducts() {
  const products = [
    {
      name: "Heritage Collection",
      desc: "Classic styling and traditional craftsmanship with timeless character.",
      image: "https://www.crownpavilions.com/Images/cards/heritage.webp"
    },
    {
      name: "Crown Sandringham",
      desc: "Spacious elegance inspired by classic estate design for ultimate comfort.",
      image: "https://www.crownpavilions.com/Images/cards/sandringham.webp"
    },
    {
      name: "Crown Buckingham",
      desc: "Our flagship design for the ultimate luxury garden retreat.",
      image: "https://www.crownpavilions.com/Images/cards/buckingham.webp"
    }
  ];

  return (
    <section className="py-40 bg-background border-b border-stone/50">
      <div className="container mx-auto px-6 max-w-[95%] xl:max-w-screen-2xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal">
          <div>
            <span className="eyebrow block mb-6">Explore Further</span>
            <h2 className="text-5xl md:text-7xl font-serif text-forest tracking-tight">The Crown Collection</h2>
          </div>
          <a href="#" className="hidden md:inline-flex text-[10px] font-bold uppercase tracking-[0.2em] text-olive border-b border-olive/30 pb-2 hover:text-forest hover:border-forest transition-colors mt-6 md:mt-0">
            View All Models
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {products.map((p, i) => (
            <div key={i} className={`group block cursor-pointer reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="overflow-hidden bg-stone/20 mb-8 relative aspect-[4/3] shadow-lg">
                <Image unoptimized 
                  src={p.image} 
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover img-hover"
                />
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors duration-700"></div>
              </div>
              <div className="pr-6">
                <h3 className="text-3xl font-serif text-forest mb-4 group-hover:text-brass transition-colors">{p.name}</h3>
                <p className="text-sm text-foreground/60 font-light leading-relaxed mb-8">{p.desc}</p>
                <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-forest">
                  Discover <svg className="w-4 h-4 ml-3 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
