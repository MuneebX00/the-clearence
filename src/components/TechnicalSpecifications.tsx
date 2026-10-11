import React from 'react';

export default function TechnicalSpecifications() {
  const specs = [
    {
      title: "Proportions",
      points: [
        "Footprint sizes from 3m x 4m upwards.",
        "Ridge height strictly under 2.5m to align with permitted development rights.",
        "Generous internal ceiling height creating a spacious atmosphere."
      ]
    },
    {
      title: "Construction",
      points: [
        "Heavy-duty timber frame structural construction.",
        "High-performance foil-backed insulation in walls, floor, and roof.",
        "Thermally efficient design suitable for year-round habitation."
      ]
    },
    {
      title: "Glazing",
      points: [
        "Premium argon-filled double-glazed units throughout.",
        "Architectural-grade aluminium bi-fold or sliding door systems.",
        "Frames finished in subtle, elegant contemporary tones."
      ]
    },
    {
      title: "Installation",
      points: [
        "Comprehensive 10-year structural guarantee.",
        "Built entirely by our own in-house specialist installation teams.",
        "Complete project management from design to final handover."
      ]
    }
  ];

  return (
    <section id="specs" className="py-40 bg-stone border-b border-foreground/5">
      <div className="container mx-auto px-6 max-w-[95%] xl:max-w-screen-2xl">
        <div className="flex flex-col lg:flex-row gap-20 xl:gap-40">
          
          <div className="lg:w-1/3 reveal">
            <span className="eyebrow block mb-8">Architectural Standards</span>
            <h2 className="text-5xl md:text-7xl font-serif text-forest mb-12 tracking-tight">Technical<br />Specifications</h2>
            <div className="w-12 h-px bg-brass mb-8"></div>
            <p className="text-foreground/60 font-light leading-relaxed max-w-sm">
              Built to exacting residential standards, the Crown Clarence is engineered for longevity, exceptional thermal performance, and year-round comfort.
            </p>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {specs.map((spec, i) => (
              <div key={i} className={`reveal reveal-delay-${(i % 2) + 1}`}>
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-forest mb-8 border-b border-forest/20 pb-4">{spec.title}</h3>
                <ul className="space-y-6">
                  {spec.points.map((point, j) => (
                    <li key={j} className="text-foreground/70 font-light text-sm leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
