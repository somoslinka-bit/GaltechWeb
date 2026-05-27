import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { LOGO_BASE64, UPCOMING_PROJECTS } from '../constants';

const STATUS_COLORS: Record<string, string> = {
  'En proyecto':    'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  'En fabricación': 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  'En montaje':     'bg-green-500/20 text-green-300 border border-green-500/30',
};

const ProximamentePage = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans">

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900 border-b border-slate-800 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="#/" className="flex-shrink-0">
            <img src={LOGO_BASE64} alt="GALTECH" className="h-12 sm:h-16 w-auto" />
          </a>
          <a
            href="#/"
            className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block text-[#ff8727] font-bold uppercase tracking-widest text-sm mb-3">
            En curso
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Próximas obras
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Proyectos contratados actualmente en etapa de ingeniería, fabricación o montaje.
            Las imágenes son renders orientativos y pueden variar del resultado final.
          </p>
        </div>
      </section>

      {/* Grid completo */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">

          {UPCOMING_PROJECTS.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-slate-500 text-lg">No hay proyectos cargados por el momento.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {UPCOMING_PROJECTS.map((project) => (
                <article
                  key={project.id}
                  className="bg-slate-800 rounded-sm overflow-hidden border border-slate-700 hover:border-slate-500 transition-colors"
                >
                  {/* Imagen / render */}
                  <div className="relative overflow-hidden bg-slate-700" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-85"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-bold ${STATUS_COLORS[project.status]}`}>
                        {project.status}
                      </span>
                    </div>
                    {/* Badge render */}
                    <div className="absolute bottom-3 right-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs text-slate-400 bg-slate-900/70">
                        Imagen referencial
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">{project.category}</p>
                    <h3 className="font-bold text-white text-lg mb-2 leading-snug">{project.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                      <span className="text-slate-400">
                        <span className="text-slate-500">Ubicación</span>{' '}
                        {project.location}
                      </span>
                      {project.area && (
                        <span className="text-slate-400">
                          <span className="text-slate-500">Superficie</span>{' '}
                          {project.area}
                        </span>
                      )}
                    </div>

                    {project.estimatedDate && (
                      <p className="mt-4 text-sm font-semibold text-[#ff8727]">
                        Entrega estimada: {project.estimatedDate}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-800 border-t border-slate-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="text-slate-400 mb-8">
            Contactanos y te asesoramos sin compromiso.
          </p>
          <a
            href="https://wa.me/5492494517644"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-bold rounded-sm hover:bg-green-700 transition-colors shadow-lg"
          >
            <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Solicitar Cotización
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} GALTECH — Ingeniería y Estructuras Metálicas. Todos los derechos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default ProximamentePage;
