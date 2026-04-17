import React from 'react';
import { ChevronRight, ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-slate-900/60 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 70%' }}
          ref={(el) => {
            if (el) {
              el.play().catch(() => {});
            }
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center sm:text-left">
        <div className="max-w-4xl">
          <span className="inline-block py-1 px-3 bg-galtech-accent text-white text-xs font-bold tracking-widest uppercase mb-6 rounded-sm">
            Ingeniería & Estructuras Metálicas
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Soluciones integrales en construcción industrial
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl font-light">
            Diseñamos y construimos naves industriales, tinglados, galpones y desarrollos comerciales con más de 50 años de experiencia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 py-4 bg-galtech-accent text-white font-bold text-lg rounded-sm hover:bg-galtech-accent transition-colors shadow-lg hover:shadow-orange-300/20"
            >
              Solicitar Cotización
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-sm hover:bg-white hover:text-slate-900 transition-all"
            >
              Conocer Servicios
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block">
        <a href="#servicios" className="text-white opacity-70 hover:opacity-100">
          <ArrowDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
