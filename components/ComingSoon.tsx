import React from 'react';
import { ArrowRight } from 'lucide-react';
import { UPCOMING_PROJECTS } from '../constants';

const STATUS_COLORS: Record<string, string> = {
  'En proyecto':    'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  'En fabricación': 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  'En montaje':     'bg-green-500/20 text-green-300 border border-green-500/30',
};

const PREVIEW_COUNT = 3;

const ComingSoon = () => {
  const preview = UPCOMING_PROJECTS.slice(0, PREVIEW_COUNT);

  return (
    <section id="proximamente" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-[#ff8727] font-bold uppercase tracking-widest text-sm mb-3">
              En curso
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Próximas obras
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl">
              Proyectos contratados actualmente en etapa de ingeniería, fabricación o montaje.
            </p>
          </div>
          {UPCOMING_PROJECTS.length > PREVIEW_COUNT && (
            <a
              href="#/proximamente"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#ff8727] hover:text-orange-400 transition-colors"
            >
              Ver todos ({UPCOMING_PROJECTS.length})
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Grid de cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((project) => (
            <article
              key={project.id}
              className="bg-slate-800 rounded-sm overflow-hidden border border-slate-700 hover:border-slate-500 transition-colors"
            >
              <div className="h-52 overflow-hidden relative bg-slate-700">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-bold ${STATUS_COLORS[project.status]}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{project.category}</p>
                <h3 className="font-bold text-white text-base mb-1 leading-snug">{project.title}</h3>
                <p className="text-sm text-slate-400">{project.location}</p>
                {project.area && (
                  <p className="mt-1 text-xs text-slate-500">{project.area}</p>
                )}
                {project.estimatedDate && (
                  <p className="mt-3 text-xs text-[#ff8727] font-semibold">
                    Estimado {project.estimatedDate}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* CTA si hay más proyectos */}
        {UPCOMING_PROJECTS.length > PREVIEW_COUNT && (
          <div className="mt-10 text-center">
            <a
              href="#/proximamente"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-sm font-semibold text-white rounded-sm hover:bg-slate-800 transition-colors"
            >
              Ver todos los proyectos en curso
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

      </div>
    </section>
  );
};

export default ComingSoon;
