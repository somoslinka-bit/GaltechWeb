import React from 'react';

interface ComingSoonProject {
  id: number;
  title: string;
  location: string;
  category: string;
  renderUrl: string;
  estimatedYear?: string;
}

export const COMING_SOON_PROJECTS: ComingSoonProject[] = [
  // Agregá los proyectos en render acá. Ejemplo:
  // {
  //   id: 1,
  //   title: 'Nombre del proyecto',
  //   location: 'Ciudad, Provincia',
  //   category: 'Nave Industrial',
  //   renderUrl: '/renders/proyecto-1.jpg',
  //   estimatedYear: '2025',
  // },
];

const ComingSoon = () => {
  if (COMING_SOON_PROJECTS.length === 0) return null;

  return (
    <section id="proximamente" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-12">
          <span className="inline-block text-[#ff8727] font-bold uppercase tracking-widest text-sm mb-3">
            En construcción
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Próximas obras
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            Proyectos contratados actualmente en etapa de ingeniería o fabricación.
          </p>
        </div>

        {/* Grid de renders */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMING_SOON_PROJECTS.map((project) => (
            <article
              key={project.id}
              className="bg-slate-800 rounded-sm overflow-hidden border border-slate-700"
            >
              <div className="h-52 overflow-hidden relative bg-slate-700">
                <img
                  src={project.renderUrl}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-bold bg-[#ff8727] text-white shadow">
                    PRÓXIMAMENTE
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{project.category}</p>
                <h3 className="font-bold text-white text-lg mb-1">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.location}</p>
                {project.estimatedYear && (
                  <p className="mt-3 text-xs text-[#ff8727] font-semibold">
                    Estimado {project.estimatedYear}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
