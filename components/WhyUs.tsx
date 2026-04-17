import React from 'react';
import { DIFFERENTIATORS } from '../constants';

const WhyUs = () => {
  return (
    <section id="diferencial" className="py-20 bg-slate-100 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text intro */}
          <div>
            <span className="text-galtech-accent font-bold uppercase tracking-wider text-sm mb-2 block">
              PILARES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Un modelo de trabajo basado en pilares sólidos
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              No somos intermediarios. Contamos con planta propia y equipos de montaje especializados, lo que nos permite garantizar la calidad en cada soldadura y cada unión.
            </p>
            <div className="hidden lg:block">
               <a href="#obras" className="text-galtech-accent font-bold hover:text-galtech-accent inline-flex items-center">
                 Ver nuestra experiencia en el mapa &rarr;
               </a>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DIFFERENTIATORS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-galtech-accent">
                  <Icon className="w-8 h-8 text-slate-800 mb-4" />
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUs;