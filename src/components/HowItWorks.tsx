import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      title: "Consultation & Site Visit",
      desc: "Our design consultants will meet with you to understand your vision, assess your garden space, and discuss suitable sizes and orientations."
    },
    {
      title: "Design Finalisation",
      desc: "We provide detailed 3D renders and architectural drawings. You can select your finishes, cladding, and bespoke internal details."
    },
    {
      title: "Crafting & Installation",
      desc: "Your garden room is meticulously crafted in our UK workshop before being installed on-site by our expert in-house team."
    }
  ];

  return (
    <section id="process" className="py-32 bg-forest text-ivory">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-24 reveal">
          <span className="eyebrow text-ivory/60 block mb-6">Our Process</span>
          <h2 className="text-4xl md:text-5xl font-serif text-ivory mb-6">From Vision to Reality</h2>
          <div className="w-px h-16 bg-gold/30 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-b border-ivory/10 reveal reveal-delay-1">
          {steps.map((step, i) => (
            <div key={i} className={`p-10 lg:p-16 ${i !== 2 ? 'md:border-r border-ivory/10' : ''} border-b md:border-b-0 border-ivory/10 last:border-b-0`}>
              <span className="text-5xl font-serif text-gold/30 block mb-8">0{i + 1}.</span>
              <h3 className="text-2xl font-serif text-ivory mb-6">{step.title}</h3>
              <p className="text-ivory/70 font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
