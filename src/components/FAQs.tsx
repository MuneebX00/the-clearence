"use client";
import React, { useState } from 'react';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Do I need planning permission for the Crown Clarence?",
      a: "In most cases, the Crown Clarence is designed to fall within 'Permitted Development' rights as the ridge height is kept under 2.5m. However, this depends on the placement in your garden and your property's specific restrictions. Our design consultants will advise you during the site visit."
    },
    {
      q: "How long does installation take?",
      a: "Once crafted in our workshop, on-site installation by our expert in-house team typically takes 1 to 2 weeks depending on the size and complexity of your garden room, ensuring minimal disruption."
    },
    {
      q: "Is the Clarence insulated for year-round use?",
      a: "Yes. The Crown Clarence features premium foil-backed insulation in the floors, walls, and roof, along with energy-efficient double glazing. It is built to residential standards for comfort in all seasons."
    },
    {
      q: "Can I customise the interior layout?",
      a: "Absolutely. During the design finalisation stage, you can customise interior layouts, plug sockets, lighting, flooring, and paint finishes to suit your exact requirements."
    }
  ];

  return (
    <section className="py-32 bg-ivory">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20 reveal">
          <span className="eyebrow block mb-6">Common Enquiries</span>
          <h2 className="text-4xl md:text-5xl font-serif text-forest">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-0 border-t border-stone/50 reveal reveal-delay-1">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-stone/50">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left py-8 flex items-center justify-between focus:outline-none group"
              >
                <span className="font-serif text-xl text-forest group-hover:text-olive transition-colors">{faq.q}</span>
                <span className={`transform transition-transform duration-500 text-olive ${openIndex === i ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7"></path></svg>
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
              >
                <div className="text-foreground/60 font-light leading-relaxed max-w-3xl">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
