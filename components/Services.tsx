import React from 'react';
import { InteractiveAccordion, AccordionItem } from './ui/interactive-accordion';

const SERVICES_DATA: AccordionItem[] = [
  {
    id: 'ingenieria-estructural',
    number: '01',
    icon: '📐',
    title: 'Ingeniería y Cálculo Estructural (Oficina Técnica)',
    content:
      'Nuestro equipo de ingenieros especializados calcula, diseña y verifica cada estructura bajo estrictas normas de seguridad. Coordinamos directamente la ingeniería con la fabricación para garantizar que la precisión del cálculo teórico se traslade de forma idéntica al taller y a la obra.',
  },
  {
    id: 'ingenieria-financiera',
    number: '02',
    icon: '📊',
    title: 'Ingeniería Financiera y Fiscal',
    content:
      'Facilitamos la estructuración del negocio y las soluciones financieras para su obra. Buscamos las mejores líneas de crédito del mercado (o desarrollamos esquemas propios) y brindamos asesoramiento contable en beneficios impositivos para garantizar la máxima eficiencia de su inversión.',
  },
  {
    id: 'fabricacion',
    number: '03',
    icon: '🏭',
    title: 'Fabricación Industrializada y Acopio',
    content:
      'Contamos con una infraestructura industrial modelo: una moderna planta de fabricación y acopio de estructuras dentro de un predio de 20.000 m². Esto nos permite optimizar los tiempos de producción, procesar grandes volúmenes y asegurar el correcto manejo de materiales certificados.',
  },
  {
    id: 'logistica',
    number: '04',
    icon: '🏗️',
    title: 'Logística, Traslado e Izaje (Grúas Propias)',
    content:
      'Disponemos de flota y equipamiento pesado propio para el traslado y movimiento de estructuras de alta complejidad. Al no depender de terceros, aseguramos una coordinación perfecta en el terreno y el cumplimiento estricto de los plazos de entrega.',
  },
  {
    id: 'seguridad',
    number: '05',
    icon: '🛡️',
    title: 'Gestión de Seguridad e Higiene',
    content:
      'La seguridad no es un factor secundario. Una oficina de Seguridad e Higiene dedicada supervisa activamente todo el proceso, mitigando riesgos tanto en la etapa de fabricación dentro de nuestra planta como durante el montaje final en la obra.',
  },
];

const Services = () => {
  return (
    <section id="servicios" className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-12">
          <span className="inline-block text-[#ff8727] font-bold uppercase tracking-widest text-sm mb-3">
            Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Capacidad técnica integral
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl">
            Ofrecemos un esquema de servicios modulares o integrales adaptados a los requerimientos específicos
            de cada cliente, profesional o director de obra.
          </p>
        </div>

        {/* Acordeón animado */}
        <InteractiveAccordion items={SERVICES_DATA} defaultActiveId="ingenieria-estructural" />
      </div>
    </section>
  );
};

export default Services;
