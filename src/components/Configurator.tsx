"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const pricingData: Record<string, number> = {
  "3x4": 39950,
  "3x4.5": 44950,
  "3x5": 47850,
  "4x3": 39950,
  "4x4": 46050,
  "4x5": 56200,
  "5x4": 56200,
  "5x5": 63950,
};

export default function Configurator() {
  const [depth, setDepth] = useState<string>("4");
  const [width, setWidth] = useState<string>("4");
  const [cladding, setCladding] = useState<string>("Premium Cedar");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const currentKey = `${depth}x${width}`;
  const price = pricingData[currentKey] || 46050;
  const formattedPrice = `£${price.toLocaleString()}`;

  // Broadcast configuration changes to prefill quote form
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('clarence-config-updated', {
        detail: {
          dimensions: `${width}m × ${depth}m`,
          cladding: cladding,
          price: formattedPrice,
        }
      });
      window.dispatchEvent(event);
    }
  }, [depth, width, cladding, formattedPrice]);

  const handleReset = () => {
    setDepth("4");
    setWidth("4");
    setCladding("Premium Cedar");
    setSaveStatus("Configuration reset to default.");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleSaveDesign = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('clarence-saved-design', JSON.stringify({
          depth, width, cladding, price: formattedPrice, timestamp: new Date().toISOString()
        }));
      } catch (e) {}
    }
    setSaveStatus("Design configuration saved to session ✓");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <section id="configurator" className="py-40 bg-background border-t border-stone">
      <div className="container mx-auto px-6 max-w-[95%] xl:max-w-screen-2xl">
        <div className="text-center mb-24 reveal">
          <span className="eyebrow block mb-8">Bespoke Design Studio</span>
          <h2 className="text-5xl md:text-7xl font-serif text-forest tracking-tight">Configure Your Clarence</h2>
          <p className="text-foreground/60 font-light mt-4 max-w-xl mx-auto">
            Explore footprint dimensions, exterior cladding finishes, and indicative investment estimates.
          </p>
        </div>
        
        <div className="flex flex-col xl:flex-row gap-0 shadow-2xl reveal reveal-delay-1 bg-ivory overflow-hidden rounded-sm border border-stone/50">
          
          <div className="xl:w-7/12 relative bg-stone/20 overflow-hidden flex flex-col p-8 lg:p-20 justify-center items-center min-h-[520px]">
            <div className="absolute inset-0 bg-gradient-to-br from-ivory/80 to-transparent"></div>
            
            <div className="relative z-10 w-full h-[380px] flex items-center justify-center">
              <Image 
                src="https://www.crownpavilions.com/img/storage/v1/render/image/public/media/50a6c47dde51f8c3e01423ce2804d0348ff626b6b0a1f104b756bab82527f52b.webp" 
                alt="Clarence Architectural Schematic Preview"
                fill
                unoptimized
                className="object-contain mix-blend-multiply drop-shadow-2xl scale-105 p-6"
              />
            </div>

            {/* Clear specification badge distinguishing static preview */}
            <div className="absolute top-8 left-8 z-20">
              <span className="bg-forest/90 text-ivory text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 font-medium shadow-sm">
                Architectural 2D Schematic
              </span>
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-foreground/10 pb-4 z-20 gap-2">
              <div>
                <p className="font-serif text-2xl text-forest">The Clarence Signature</p>
                <p className="text-xs text-foreground/60 font-light mt-0.5">Selected footprint: {width}m width × {depth}m depth</p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-medium bg-ivory/90 px-3 py-1 border border-stone">
                Static render • Interactive 3D CAD available upon private consultation
              </p>
            </div>
          </div>
          
          <div className="xl:w-5/12 flex flex-col justify-between p-10 lg:p-16 relative z-10 bg-ivory shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.05)]">
            <div>
              <div className="flex justify-between items-end mb-10 border-b border-stone pb-4">
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-forest">Specification Controls</h3>
                <span className="text-xs font-serif italic text-foreground/50">{width}m × {depth}m • {cladding}</span>
              </div>
              
              {/* Depth Selection */}
              <div className="mb-10">
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Building Depth</label>
                  <span className="font-serif text-lg text-olive">{depth} Metres</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["3", "4", "5"].map((d) => (
                    <button 
                      key={d}
                      onClick={() => setDepth(d)}
                      className={`py-3.5 text-xs tracking-widest uppercase transition-all duration-300 border ${depth === d ? 'border-forest bg-forest text-ivory font-semibold shadow-md' : 'border-stone bg-transparent text-foreground/70 hover:border-olive'}`}
                    >
                      {d}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Width Selection */}
              <div className="mb-10">
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Building Width</label>
                  <span className="font-serif text-lg text-olive">{width} Metres</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {["3", "4", "4.5", "5"].map((w) => (
                    <button 
                      key={w}
                      onClick={() => setWidth(w)}
                      className={`py-3.5 text-xs tracking-widest uppercase transition-all duration-300 border ${width === w ? 'border-forest bg-forest text-ivory font-semibold shadow-md' : 'border-stone bg-transparent text-foreground/70 hover:border-olive'}`}
                    >
                      {w}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Cladding Selection */}
              <div className="mb-10">
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Cladding Material</label>
                  <span className="text-xs text-foreground/50 font-light">Sustainably Sourced</span>
                </div>
                <div className="relative">
                  <select 
                    value={cladding}
                    onChange={(e) => setCladding(e.target.value)}
                    className="w-full py-3.5 px-0 bg-transparent border-b border-stone focus:border-forest focus:ring-0 focus:outline-none text-foreground font-serif text-xl cursor-pointer appearance-none transition-colors"
                  >
                    <option value="Premium Cedar">Premium Cedar Cladding</option>
                    <option value="Treated Redwood">Treated Redwood Finish</option>
                    <option value="Composite">Composite Architectural Finish</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-olive">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {/* Save & Reset Actions */}
              <div className="flex gap-4 pt-2">
                <button 
                  onClick={handleSaveDesign}
                  className="text-[10px] uppercase tracking-[0.2em] text-forest border border-forest/30 px-4 py-2.5 hover:bg-forest hover:text-ivory transition-colors font-medium flex-1 text-center"
                >
                  Save Design
                </button>
                <button 
                  onClick={handleReset}
                  className="text-[10px] uppercase tracking-[0.2em] text-foreground/60 border border-stone px-4 py-2.5 hover:border-forest hover:text-forest transition-colors font-medium flex-1 text-center"
                >
                  Reset Defaults
                </button>
              </div>

              {saveStatus && (
                <p className="text-xs text-olive font-medium mt-3 text-center animate-fade-in">
                  {saveStatus}
                </p>
              )}
            </div>

            <div className="pt-10 mt-8 border-t border-stone">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-1 font-medium">Indicative Investment</p>
                  <p className="text-5xl font-serif text-forest tracking-tight">
                    {formattedPrice}
                  </p>
                  <p className="text-[10px] text-foreground/50 uppercase tracking-widest mt-1">Includes base, delivery & install</p>
                </div>
              </div>
              
              <a href="#quote" className="btn-primary w-full shadow-xl text-center">
                Request Formal Quote with this Design
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
