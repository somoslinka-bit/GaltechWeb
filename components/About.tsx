import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ABOUT_IMAGES } from '../constants';

const AboutCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = ABOUT_IMAGES.length;

  const go = (dir: 1 | -1) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent((prev) => (prev + dir + total) % total);
    startAutoplay();
  };

  const startAutoplay = () => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3500);
  };

  useEffect(() => {
    startAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-sm bg-slate-100" style={{ aspectRatio: '4/3' }}>
      {ABOUT_IMAGES.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img
            src={img.src}
            alt={img.caption}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <p className="text-white text-sm font-semibold drop-shadow">{img.caption}</p>
          </div>
        </div>
      ))}

      {/* Flechas */}
      <button
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 right-4 z-20 flex gap-1.5">
        {ABOUT_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setCurrent(i); startAutoplay(); }}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/50'}`}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-2 items-center">

          {/* Texto */}
          <div>
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

          {/* Carrusel */}
          <AboutCarousel />

        </div>

        <div className="mt-14 border-t border-gray-200" />
      </div>
    </section>
  );
}
