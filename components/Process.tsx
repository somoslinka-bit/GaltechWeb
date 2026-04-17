import React from 'react';
import { PROCESS_STEPS } from '../constants';

const Process = () => {
  return (
    <section id="proceso" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Cómo Trabajamos</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Un proceso estructurado para garantizar resultados predecibles y exitosos.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl mb-6 border-4 border-white shadow-lg group-hover:bg-galtech-accent group-hover:scale-110 transition-all duration-300">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 px-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;