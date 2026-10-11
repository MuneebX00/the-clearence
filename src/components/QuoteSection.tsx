"use client";

import React, { useState, useEffect } from 'react';

export default function QuoteSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    notes: '',
  });

  const [specs, setSpecs] = useState({
    dimensions: '4m × 4m',
    cladding: 'Premium Cedar',
    price: '£46,050',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Listen to configuration updates from window event
  useEffect(() => {
    const handleConfigChange = (e: CustomEvent) => {
      if (e.detail) {
        setSpecs(e.detail);
      }
    };
    window.addEventListener('clarence-config-updated', handleConfigChange as EventListener);
    return () => window.removeEventListener('clarence-config-updated', handleConfigChange as EventListener);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vErrors = validate();
    if (Object.keys(vErrors).length > 0) {
      setErrors(vErrors);
    } else {
      setErrors({});
      setTimeout(() => setSubmitted(true), 600);
    }
  };

  return (
    <section id="quote" className="py-40 bg-stone border-t border-forest/10">
      <div className="container mx-auto px-6 max-w-[95%] xl:max-w-screen-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="lg:col-span-5 reveal">
            <span className="eyebrow block mb-8">Formal Consultation</span>
            <h2 className="text-5xl md:text-6xl font-serif text-forest mb-8 tracking-tight">Request a Tailored Quote</h2>
            <div className="w-12 h-px bg-brass mb-8"></div>
            <p className="text-foreground/70 font-light leading-relaxed text-lg mb-12">
              Receive a detailed architectural estimate and specification for your Clarence garden room. Every project includes site survey, British craftsmanship, and full turnkey installation.
            </p>

            <div className="bg-ivory p-8 border border-stone shadow-md mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-forest/60 font-semibold block mb-4">Configured Specification</span>
              <div className="space-y-3 border-t border-stone pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60 font-light">Footprint:</span>
                  <span className="font-serif text-forest font-medium">{specs.dimensions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60 font-light">Cladding Finish:</span>
                  <span className="font-serif text-forest font-medium">{specs.cladding}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60 font-light">Indicative Investment:</span>
                  <span className="font-serif text-forest font-bold">{specs.price}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-foreground/50 font-light">
              * Indicative guide price includes foundation base, insulation, glazing, and delivery within mainland UK.
            </p>
          </div>

          <div className="lg:col-span-7 bg-ivory p-10 md:p-16 shadow-2xl border border-stone/50 reveal reveal-delay-1">
            {submitted ? (
              <div className="py-16 text-center animate-fade-in">
                <div className="w-16 h-16 border-2 border-forest rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 12.75l6 6 9-13.5"></path></svg>
                </div>
                <h3 className="text-4xl font-serif text-forest mb-4">Quote Request Received</h3>
                <p className="text-foreground/70 font-light leading-relaxed max-w-md mx-auto mb-8">
                  Thank you, {formData.name}. We have logged your request for The Clarence ({specs.dimensions}, {specs.cladding}). A Senior Design Consultant will contact you within 24 hours with your preliminary architectural package.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] uppercase tracking-[0.2em] text-brass hover:text-forest transition-colors font-medium border-b border-brass pb-1"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <h3 className="font-serif text-3xl text-forest mb-2">Personal Details</h3>
                <p className="text-xs text-foreground/50 uppercase tracking-[0.2em] mb-8 font-medium">All fields marked with an asterisk are required</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-forest/70 block mb-2">Full Name *</label>
                    <input 
                      type="text"
                      className="w-full bg-background border border-stone px-4 py-3 text-sm focus:outline-none focus:border-forest transition-colors font-light"
                      placeholder="e.g. Lord Edward Sterling"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-700 text-xs mt-1 font-medium">{errors.name}</p>}
                  </div>

                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-forest/70 block mb-2">Email Address *</label>
                    <input 
                      type="email"
                      className="w-full bg-background border border-stone px-4 py-3 text-sm focus:outline-none focus:border-forest transition-colors font-light"
                      placeholder="e.g. sterling@estate.co.uk"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-700 text-xs mt-1 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-forest/70 block mb-2">Telephone *</label>
                    <input 
                      type="tel"
                      className="w-full bg-background border border-stone px-4 py-3 text-sm focus:outline-none focus:border-forest transition-colors font-light"
                      placeholder="e.g. 07700 900077"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-red-700 text-xs mt-1 font-medium">{errors.phone}</p>}
                  </div>

                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-forest/70 block mb-2">Installation Postcode</label>
                    <input 
                      type="text"
                      className="w-full bg-background border border-stone px-4 py-3 text-sm focus:outline-none focus:border-forest transition-colors font-light"
                      placeholder="e.g. OX49 5EP"
                      value={formData.postcode}
                      onChange={e => setFormData({ ...formData, postcode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-forest/70 block mb-2">Specific Requirements or Garden Notes</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-background border border-stone p-4 text-sm focus:outline-none focus:border-forest transition-colors font-light"
                    placeholder="Tell us about your garden orientation, intended use (office, gym, retreat), or timeline..."
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="btn-primary w-full shadow-xl">
                    Submit Formal Quotation Request
                  </button>
                  <p className="text-[10px] text-center text-foreground/40 uppercase tracking-[0.2em] mt-4">
                    Your details are held securely and never shared with third parties.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
