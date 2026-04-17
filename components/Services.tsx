import React from 'react';
import { SERVICES } from '../constants';

const Services = () => {
  return (
    <section id="servicios" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Soluciones Industriales Integrales
          </h2>
          <p className="text-lg text-slate-600">
            Abarcamos todas las etapas del proyecto, desde el cálculo inicial hasta el montaje final, asegurando calidad y durabilidad.
          </p>
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                  className={[ "group p-8 border border-slate-200 rounded-sm hover:border-galtech-accent hover:shadow-lg transition-all duration-300 w-full",
                    // ✅ si hay 5 cards, centra las 2 últimas en desktop (lg:grid-cols-3)
                    SERVICES.length === 5 && index === 3 ? "lg:col-start-2" : "",
                    SERVICES.length === 5 && index === 4 ? "lg:col-start-3" : "",
                  ].join(" ")}              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-galtech-accent transition-colors">
                  <Icon className="w-7 h-7 text-galtech-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-galtech-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;