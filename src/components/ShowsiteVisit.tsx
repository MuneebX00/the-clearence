"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function ShowsiteVisit() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.phone) newErrors.phone = 'Required';
    if (!formData.location) newErrors.location = 'Please select a location';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setTimeout(() => setSubmitted(true), 800);
    }
  };

  return (
    <section id="showsite" className="py-40 bg-ivory">
      <div className="container mx-auto px-6 max-w-[95%] xl:max-w-screen-2xl">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-0 shadow-2xl bg-white overflow-hidden reveal rounded-sm">
          
          <div className="xl:col-span-7 relative hidden xl:block overflow-hidden group">
            <Image unoptimized 
              src="https://www.crownpavilions.com/Images/pages/about/showsite.webp" 
              alt="Crown Pavilions Showsite"
              fill
              sizes="60vw"
              className="object-cover img-hover"
            />
            <div className="absolute inset-0 bg-forest/20 mix-blend-multiply"></div>
          </div>
          
          <div className="xl:col-span-5 p-12 md:p-24 relative bg-ivory">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone/40 -z-10 rounded-full blur-3xl"></div>
            
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center min-h-[500px] animate-fade-in">
                <div className="w-20 h-20 border border-brass rounded-full flex items-center justify-center mb-10">
                  <svg className="w-8 h-8 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg>
                </div>
                <h3 className="text-4xl font-serif text-forest mb-6">Invitation Requested</h3>
                <p className="text-foreground/70 font-light leading-relaxed mb-10 max-w-sm">
                  Thank you, {formData.name}. Our design consultants will contact you shortly to confirm your private viewing at our {formData.location} location.
                </p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="text-[10px] uppercase tracking-[0.2em] text-olive hover:text-forest transition-colors font-medium border-b border-olive/30 pb-1 hover:border-forest"
                >
                  Book another visit
                </button>
              </div>
            ) : (
              <div className="min-h-[500px]">
                <span className="eyebrow block mb-8">Experience It</span>
                <h3 className="text-5xl md:text-6xl font-serif text-forest mb-8 tracking-tight">See it in person.</h3>
                <p className="text-foreground/60 font-light mb-16 text-lg">
                  Choose a show site location, and a design consultant will arrange a private viewing.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="relative">
                    <input 
                      type="text" 
                      id="name"
                      className="peer w-full bg-transparent border-b border-stone py-4 text-foreground focus:outline-none focus:border-brass transition-colors placeholder-transparent font-light"
                      placeholder="Name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-[10px] font-medium text-foreground/40 uppercase tracking-[0.2em] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-brass">Full Name</label>
                    {errors.name && <p className="absolute right-0 top-4 text-red-800/60 text-xs font-medium">{errors.name}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative">
                      <input 
                        type="email" 
                        id="email"
                        className="peer w-full bg-transparent border-b border-stone py-4 text-foreground focus:outline-none focus:border-brass transition-colors placeholder-transparent font-light"
                        placeholder="Email"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                      <label htmlFor="email" className="absolute left-0 -top-3.5 text-[10px] font-medium text-foreground/40 uppercase tracking-[0.2em] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-brass">Email Address</label>
                      {errors.email && <p className="absolute right-0 top-4 text-red-800/60 text-xs font-medium">{errors.email}</p>}
                    </div>
                    
                    <div className="relative">
                      <input 
                        type="tel" 
                        id="phone"
                        className="peer w-full bg-transparent border-b border-stone py-4 text-foreground focus:outline-none focus:border-brass transition-colors placeholder-transparent font-light"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                      <label htmlFor="phone" className="absolute left-0 -top-3.5 text-[10px] font-medium text-foreground/40 uppercase tracking-[0.2em] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-brass">Phone Number</label>
                      {errors.phone && <p className="absolute right-0 top-4 text-red-800/60 text-xs font-medium">{errors.phone}</p>}
                    </div>
                  </div>
                  
                  <div className="relative pt-4">
                    <select 
                      className={`w-full bg-transparent border-b py-4 text-foreground font-light focus:outline-none focus:border-brass transition-colors appearance-none cursor-pointer ${errors.location ? 'border-red-300' : 'border-stone'} ${!formData.location ? 'text-foreground/40' : ''}`}
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    >
                      <option value="" disabled>Select a location...</option>
                      <option value="Essex">Essex Show Site</option>
                      <option value="London">London Show Site</option>
                      <option value="Surrey">Surrey Show Site</option>
                      <option value="Hertfordshire">Hertfordshire Show Site</option>
                      <option value="Buckinghamshire">Buckinghamshire Show Site</option>
                      <option value="Cheshire">Cheshire Show Site</option>
                    </select>
                    <div className="absolute right-0 top-1/2 translate-y-1 pointer-events-none text-olive">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    {errors.location && <p className="absolute right-8 top-8 text-red-800/60 text-xs font-medium">{errors.location}</p>}
                  </div>
                  
                  <div className="pt-10">
                    <button type="submit" className="btn-primary w-full shadow-lg">
                      Request Invitation
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}
