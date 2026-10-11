import React from 'react';
import Image from 'next/image';

export default function TrustAndReassurance() {
  return (
    <section className="py-40 bg-background border-b border-stone/50 overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-[95%] xl:max-w-screen-2xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-center">
          
          <div className="reveal">
            <span className="eyebrow block mb-10">Client Testimonial</span>
            <div className="flex text-brass mb-10">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 text-brass fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              ))}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-forest mb-10 leading-tight italic tracking-tight">
              "Their buildings are undoubtedly the best that money can buy and the service level was exceptional."
            </h2>
            <p className="text-foreground/70 font-light leading-relaxed mb-12 text-lg">
              After looking at numerous garden rooms and luxury wooden gazebos on the market we decided to go with Crown Pavilions. They exceeded our expectations at every stage. If you are looking for the best garden buildings on the market, then Crown Pavilions is the company to hire!
            </p>
            
            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden filter grayscale">
                <Image unoptimized 
                  src="https://www.crownpavilions.com/Images/pages/celebrity/lord-alan-sugar.webp" 
                  alt="Lord Alan Sugar"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-serif text-xl text-forest">Lord Alan Sugar</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-medium mt-1">Entrepreneur</p>
              </div>
            </div>
          </div>
          
          <div className="bg-stone/20 p-12 lg:p-20 reveal reveal-delay-2 shadow-xl border border-stone/40">
            <h3 className="text-2xl font-serif text-forest mb-12 pb-6 border-b border-forest/10">Our Guarantees</h3>
            <ul className="space-y-12">
              <li className="flex gap-8">
                <div className="w-px h-auto bg-brass/50 flex-shrink-0"></div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-forest mb-3">10-Year Guarantee</h4>
                  <p className="text-foreground/60 font-light text-sm leading-relaxed">Comprehensive cover on the timber framework and structure.</p>
                </div>
              </li>
              <li className="flex gap-8">
                <div className="w-px h-auto bg-brass/50 flex-shrink-0"></div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-forest mb-3">FSC® Certified</h4>
                  <p className="text-foreground/60 font-light text-sm leading-relaxed">All our timber is sourced from sustainably managed forests.</p>
                </div>
              </li>
              <li className="flex gap-8">
                <div className="w-px h-auto bg-brass/50 flex-shrink-0"></div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-forest mb-3">In-House Installation</h4>
                  <p className="text-foreground/60 font-light text-sm leading-relaxed">We never use sub-contractors for installation, ensuring quality control.</p>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
