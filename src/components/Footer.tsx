import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#14261A] text-ivory/60 pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-[95%] xl:max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-32 reveal">
          
          <div className="md:col-span-4">
            <h4 className="text-2xl font-serif text-ivory mb-8 tracking-[0.2em] uppercase font-bold">CROWN PAVILIONS</h4>
            <p className="text-sm leading-relaxed mb-8 font-light max-w-sm">
              Award-winning British craftsmanship creating luxury garden buildings, bespoke wooden gazebos, and insulated garden rooms since 2006.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-brass font-medium border border-brass/30 px-4 py-2">FSC® Certified</span>
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-7">
            <h5 className="font-medium uppercase tracking-[0.2em] text-[10px] text-ivory mb-10">Collections</h5>
            <ul className="space-y-5 text-sm font-light">
              <li><a href="#" className="hover:text-brass transition-colors">Insulated Garden Rooms</a></li>
              <li><a href="#" className="hover:text-brass transition-colors">Wooden Gazebos</a></li>
              <li><a href="#" className="hover:text-brass transition-colors">Glazed Gazebos</a></li>
              <li><a href="#" className="hover:text-brass transition-colors">Bespoke Buildings</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h5 className="font-medium uppercase tracking-[0.2em] text-[10px] text-ivory mb-10">Company</h5>
            <ul className="space-y-5 text-sm font-light">
              <li><a href="#" className="hover:text-brass transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-brass transition-colors">Journal</a></li>
              <li><a href="#showsite" className="hover:text-brass transition-colors">Show Sites</a></li>
              <li><a href="#" className="hover:text-brass transition-colors">Brochure</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h5 className="font-medium uppercase tracking-[0.2em] text-[10px] text-ivory mb-10">Enquiries</h5>
            <ul className="space-y-5 text-sm font-light mb-8">
              <li><a href="tel:01491612820" className="hover:text-ivory transition-colors text-brass">01491 612820</a></li>
              <li><a href="mailto:sales@crownpavilions.com" className="hover:text-brass transition-colors">sales@crownpavilions.com</a></li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-12 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-6 reveal reveal-delay-2">
          <p className="text-xs font-light">© Crown Pavilions. Registered in England & Wales.</p>
          <div className="flex gap-8 text-xs font-light">
            <a href="#" className="hover:text-ivory transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ivory transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
