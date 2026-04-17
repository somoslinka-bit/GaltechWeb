import React from 'react';

const clients = [
  { name: 'Bahía', logo: '/logos/bahia.png' },
  { name: 'Citroën', logo: '/logos/citroen.png' },
  { name: 'El Cencerro', logo: '/logos/el-cencerro.png' },
  { name: 'Elegance', logo: '/logos/elegance.png' },
  { name: 'Johnson', logo: '/logos/johnson.jpg' },
  { name: 'KWS', logo: '/logos/kws.png' },
  { name: 'Lifan Lifort', logo: '/logos/lifan-lifort.png' },
  { name: 'Loimar', logo: '/logos/loimar.png' },
];

export default function Clients() {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-800 uppercase tracking-widest">
          Nuestros Clientes
        </h2>
        <div className="w-24 h-1 bg-galtech-accent mx-auto mt-4"></div>
      </div>
      
      <div className="relative w-full flex overflow-hidden group">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {/* First set of logos */}
          {clients.map((client, index) => (
            <div key={index} className="mx-8 w-48 h-24 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img src={client.logo} alt={client.name} className="max-h-full max-w-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
            </div>
          ))}
          {/* Duplicated set for seamless loop */}
          {clients.map((client, index) => (
            <div key={`dup-${index}`} className="mx-8 w-48 h-24 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img src={client.logo} alt={client.name} className="max-h-full max-w-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
