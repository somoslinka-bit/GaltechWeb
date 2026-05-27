import React from 'react';
import { ABOUT_MEDIA } from '../constants';

const fadeStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fadeUp-1 { animation: fadeUp 650ms ease-out both; }
  .fadeUp-2 { animation: fadeUp 650ms ease-out both; animation-delay: 120ms; }
`;

const MediaItem = ({ item }: { item: typeof ABOUT_MEDIA[number] }) => {
  if (item.type === 'video') {
    return (
      <div className="relative overflow-hidden rounded-2xl shadow-sm border border-gray-200 bg-black">
        <video
          src={item.src}
          className="w-full object-cover h-[240px] md:h-[260px]"
          controls
          playsInline
          preload="metadata"
        />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
          <p className="text-white text-sm font-semibold">{item.caption}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-sm border border-gray-200 bg-white">
      <img
        src={item.src}
        alt={item.caption}
        className="w-full object-cover h-[240px] md:h-[260px]"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-white text-sm font-semibold">{item.caption}</p>
      </div>
    </div>
  );
};

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-gray-50 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: fadeStyles }} />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-2 items-start">

          {/* Texto — sin cambios */}
          <div className="fadeUp-1">
            <p className="text-sm font-semibold tracking-widest uppercase text-gray-500">
              NOSOTROS
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-galtech-dark">
              Más de 50 años en construcción industrial
            </h2>
            <p className="mt-5 text-lg text-gray-700 leading-relaxed">
              Desde hace más de cinco décadas, Galtech acompaña a empresas e
              instituciones en el desarrollo de proyectos industriales y
              comerciales. Contamos con equipo técnico propio, oficina de
              ingeniería y procesos consolidados que garantizan previsibilidad,
              control y calidad en cada etapa.
            </p>
            <p className="mt-5 text-lg text-gray-700 leading-relaxed">
              Trabajamos con una visión integral: desde el diseño y cálculo estructural hasta la fabricación y el montaje en obra, cuidando plazos y detalles de ejecución. Nuestro compromiso es entregar soluciones seguras y durables, con comunicación clara y seguimiento permanente, para que cada proyecto avance con orden y sin sorpresas.
            </p>
          </div>

          {/* Grid de medios (imágenes + videos) */}
          <div className="fadeUp-2 grid grid-cols-2 gap-4">
            {ABOUT_MEDIA.map((item, i) => (
              <div
                key={i}
                className={
                  ABOUT_MEDIA.length % 2 !== 0 && i === ABOUT_MEDIA.length - 1
                    ? 'col-span-2'
                    : ''
                }
              >
                <MediaItem item={item} />
              </div>
            ))}
          </div>

        </div>

        <div className="mt-14 border-t border-gray-200" />
      </div>
    </section>
  );
}
