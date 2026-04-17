import React, { useRef } from 'react';
import { useScroll } from 'motion/react';
import { StackingCard, ServiceCardData } from './ui/stacking-card';

const SERVICES_CARDS: ServiceCardData[] = [
  {
    title: 'Tinglados Metálicos',
    description:
      'Estructuras versátiles para almacenamiento, logística y producción agropecuaria. Adaptamos cada tinglado a las condiciones del terreno y las necesidades del cliente.',
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    color: '#1e293b',
  },
  {
    title: 'Naves Industriales',
    description:
      'Diseño y construcción de naves industriales adaptadas a procesos productivos de gran escala. Garantizamos resistencia estructural, funcionalidad y eficiencia.',
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    color: '#2A5C72',
  },
  {
    title: 'Locales Comerciales',
    description:
      'Espacios comerciales funcionales y eficientes con identidad propia. Combinamos estética y estructura para proyectos que representan a tu marca.',
    imageUrl:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&auto=format&fit=crop&q=80',
    color: '#1a3a4a',
  },
  {
    title: 'Galpones Industriales',
    description:
      'Soluciones estructurales robustas para la industria y el agro. Amplia experiencia en proyectos de gran porte en toda la provincia de Buenos Aires.',
    imageUrl:
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80',
    color: '#243447',
  },
];

const Services = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="servicios" className="bg-slate-950">
      {/* Encabezado de sección */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center">
        <span className="inline-block text-[#ff8727] font-bold uppercase tracking-widest text-sm mb-3">
          Servicios
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Soluciones Industriales Integrales
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Abarcamos todas las etapas del proyecto, desde el cálculo inicial hasta el montaje final, asegurando calidad y durabilidad.
        </p>
      </div>

      {/* Stacking cards */}
      <div ref={container} style={{ marginTop: `calc(${SERVICES_CARDS.length} * -1px)` }}>
        {SERVICES_CARDS.map((service, i) => {
          const targetScale = 1 - (SERVICES_CARDS.length - i) * 0.05;
          return (
            <StackingCard
              key={i}
              i={i}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
              color={service.color}
              progress={scrollYProgress}
              range={[i * (1 / SERVICES_CARDS.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* Espaciado final */}
      <div className="h-24" />
    </section>
  );
};

export default Services;
