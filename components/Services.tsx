import React, { useState } from 'react';

interface ServiceCard {
  icon: string;
  title: string;
  body: string;
}

const SERVICES_DATA: ServiceCard[] = [
  {
    icon: '📐',
    title: 'Ingeniería y Cálculo Estructural (Oficina Técnica)',
    body: 'Nuestro equipo de ingenieros especializados calcula, diseña y verifica cada estructura bajo estrictas normas de seguridad. Coordinamos directamente la ingeniería con la fabricación para garantizar que la precisión del cálculo teórico se traslade de forma idéntica al taller y a la obra.',
  },
  {
    icon: '📊',
    title: 'Ingeniería Financiera y Fiscal',
    body: 'Facilitamos la estructuración del negocio y las soluciones financieras para su obra. Buscamos las mejores líneas de crédito del mercado (o desarrollamos esquemas propios) y brindamos asesoramiento contable en beneficios impositivos para garantizar la máxima eficiencia de su inversión.',
  },
  {
    icon: '🏭',
    title: 'Fabricación Industrializada y Acopio',
    body: 'Contamos con una infraestructura industrial modelo: una moderna planta de fabricación y acopio de estructuras dentro de un predio de 20.000 m². Esto nos permite optimizar los tiempos de producción, procesar grandes volúmenes y asegurar el correcto manejo de materiales certificados.',
  },
  {
    icon: '🏗️',
    title: 'Logística, Traslado e Izaje (Grúas Propias)',
    body: 'Disponemos de flota y equipamiento pesado propio para el traslado y movimiento de estructuras de alta complejidad. Al no depender de terceros, aseguramos una coordinación perfecta en el terreno y el cumplimiento estricto de los plazos de entrega.',
  },
  {
    icon: '🛡️',
    title: 'Gestión de Seguridad e Higiene',
    body: 'La seguridad no es un factor secundario. Una oficina de Seguridad e Higiene dedicada supervisa activamente todo el proceso, mitigando riesgos tanto en la etapa de fabricación dentro de nuestra planta como durante el montaje final en la obra.',
  },
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="servicios" className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="inline-block text-[#ff8727] font-bold uppercase tracking-widest text-sm mb-3">
            Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            SERVICIOS
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Capacidad técnica, respaldo industrial y soluciones financieras para su proyecto.
          </p>
        </div>

        {/* Intro */}
        <p className="text-slate-600 text-base leading-relaxed mb-10 text-center max-w-3xl mx-auto">
          En Galtech ofrecemos un esquema de servicios modulares o integrales que se adaptan a los requerimientos
          específicos de cada cliente, profesional o director de obra, garantizando autonomía y precisión en cada etapa:
        </p>

        {/* Acordeón de servicios */}
        <div className="divide-y divide-slate-200 border border-slate-200 rounded-sm overflow-hidden">
          {SERVICES_DATA.map((service, i) => {
            const isOpen = activeIndex === i;
            return (
              <div key={i} className="bg-white">
                <button
                  onClick={() => setActiveIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{service.icon}</span>
                    <span className="font-semibold text-slate-900 text-base">{service.title}</span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 bg-slate-50 border-t border-slate-100">
                    <p className="text-slate-600 text-sm leading-relaxed pl-10">{service.body}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
