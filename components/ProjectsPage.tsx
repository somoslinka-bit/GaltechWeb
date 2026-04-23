import React, { useState } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { LOGO_BASE64 } from '../constants';

type Category =
  | 'todos'
  | 'agroquimicos'
  | 'depositos'
  | 'locales'
  | 'camara-frio'
  | 'viviendas'
  | 'canchas';

interface Project {
  id: number;
  title: string;
  location: string;
  category: Exclude<Category, 'todos'>;
  categoryLabel: string;
  area: string;
  year: string;
  description: string;
  imageUrl: string;
}

const CATEGORY_PROJECTS: Project[] = [
  // Agroquímicos
  {
    id: 1,
    title: 'Planta de Almacenamiento Agroquímico',
    location: 'Pergamino, Buenos Aires',
    category: 'agroquimicos',
    categoryLabel: 'Agroquímicos',
    area: '6.500 m²',
    year: '2024',
    description: 'Planta de almacenamiento y distribución de productos agroquímicos con normativas de seguridad industrial.',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    title: 'Centro de Distribución Agro',
    location: 'Rosario, Santa Fe',
    category: 'agroquimicos',
    categoryLabel: 'Agroquímicos',
    area: '8.200 m²',
    year: '2023',
    description: 'Centro logístico para distribución de insumos agrícolas con depósitos climatizados y zona de carga.',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    title: 'Depósito de Fitosanitarios',
    location: 'Venado Tuerto, Santa Fe',
    category: 'agroquimicos',
    categoryLabel: 'Agroquímicos',
    area: '3.800 m²',
    year: '2023',
    description: 'Depósito con sistema de ventilación forzada y contención de derrames para productos fitosanitarios.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 4,
    title: 'Planta de Formulación Agroquímica',
    location: 'Río Cuarto, Córdoba',
    category: 'agroquimicos',
    categoryLabel: 'Agroquímicos',
    area: '5.100 m²',
    year: '2022',
    description: 'Nave industrial para formulación y envasado de agroquímicos con estándares internacionales de seguridad.',
    imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=600',
  },
  // Depósitos y Naves Industriales
  {
    id: 9,
    title: 'Tinglado Logístico Zona Norte',
    location: 'Campana, Buenos Aires',
    category: 'depositos',
    categoryLabel: 'Depósitos y Naves Industriales',
    area: '12.000 m²',
    year: '2024',
    description: 'Gran tinglado para operaciones logísticas con portones automatizados y docks de carga.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 10,
    title: 'Tinglado Industrial Parque Sur',
    location: 'Neuquén',
    category: 'depositos',
    categoryLabel: 'Depósitos y Naves Industriales',
    area: '7.500 m²',
    year: '2023',
    description: 'Tinglado para almacenamiento industrial con estructura de acero galvanizado y cubierta tipo sándwich.',
    imageUrl: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 11,
    title: 'Tinglado Agropecuario',
    location: 'Tandil, Buenos Aires',
    category: 'depositos',
    categoryLabel: 'Depósitos y Naves Industriales',
    area: '4.200 m²',
    year: '2023',
    description: 'Tinglado para almacenamiento de maquinaria agrícola y granos con ventilación natural.',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 12,
    title: 'Tinglado Portuario',
    location: 'Bahía Blanca, Buenos Aires',
    category: 'depositos',
    categoryLabel: 'Depósitos y Naves Industriales',
    area: '9.800 m²',
    year: '2022',
    description: 'Tinglado de grandes luces para operaciones portuarias con resistencia a vientos costeros.',
    imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=600',
  },
  // Locales Comerciales
  {
    id: 5,
    title: 'Centro Comercial Plaza Sur',
    location: 'Mar del Plata, Buenos Aires',
    category: 'locales',
    categoryLabel: 'Locales Comerciales',
    area: '4.500 m²',
    year: '2024',
    description: 'Desarrollo comercial con 12 locales, estacionamiento cubierto y espacios comunes.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 6,
    title: 'Strip Mall Nordelta',
    location: 'Tigre, Buenos Aires',
    category: 'locales',
    categoryLabel: 'Locales Comerciales',
    area: '3.200 m²',
    year: '2023',
    description: 'Complejo de locales comerciales con diseño moderno y grandes vidrieras.',
    imageUrl: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 7,
    title: 'Galería Comercial Centro',
    location: 'Córdoba Capital',
    category: 'locales',
    categoryLabel: 'Locales Comerciales',
    area: '2.800 m²',
    year: '2023',
    description: 'Galería comercial en zona céntrica con estructura metálica y cerramientos de alta prestación.',
    imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 8,
    title: 'Local Ancla Supermercado',
    location: 'Mendoza Capital',
    category: 'locales',
    categoryLabel: 'Locales Comerciales',
    area: '5.000 m²',
    year: '2022',
    description: 'Construcción de local ancla para cadena de supermercados con cámara frigorífica integrada.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
  },
  // Cámara y Procesado en Frío — próximamente
  // Viviendas y Oficinas — próximamente
  // Canchas y Polideportivos — próximamente
];

const categories: { key: Category; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'agroquimicos', label: 'Agroquímicos' },
  { key: 'depositos', label: 'Depósitos y Naves Industriales' },
  { key: 'locales', label: 'Locales Comerciales' },
  { key: 'camara-frio', label: 'Cámara y Procesado en Frío' },
  { key: 'viviendas', label: 'Viviendas y Oficinas' },
  { key: 'canchas', label: 'Canchas y Polideportivos' },
];

const EMPTY_STATE_LABELS: Partial<Record<Category, string>> = {
  'camara-frio': 'Cámara y Procesado en Frío',
  'viviendas': 'Viviendas y Oficinas',
  'canchas': 'Canchas y Polideportivos',
};

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('todos');

  const filteredProjects = activeCategory === 'todos'
    ? CATEGORY_PROJECTS
    : CATEGORY_PROJECTS.filter((p) => p.category === activeCategory);

  const showEmptyState = filteredProjects.length === 0;

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="#/" className="flex-shrink-0">
            <img src={LOGO_BASE64} alt="GALTECH" className="h-10 sm:h-12 w-auto" />
          </a>
          <a
            href="#/"
            className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-galtech-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </a>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-galtech-accent mb-3">
            NUESTROS PROYECTOS
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Proyectos por rubro
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Explorá nuestras obras realizadas en los distintos rubros donde Galtech aporta soluciones de ingeniería y estructuras metálicas.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-[60px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-sm text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.key
                    ? 'bg-galtech-accent text-white shadow-md'
                    : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {showEmptyState ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Proyectos de {EMPTY_STATE_LABELS[activeCategory] ?? 'esta categoría'} próximamente
              </h3>
              <p className="text-gray-500 max-w-md">
                Estamos cargando los proyectos de este rubro. Volvé pronto o contactanos para conocer más sobre nuestras obras.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-500 text-sm">
                  {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="h-56 w-full overflow-hidden relative">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-bold bg-galtech-accent text-white shadow">
                          {project.categoryLabel}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium text-gray-500">{project.year}</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {project.location}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <span className="block text-xs text-gray-400">Superficie</span>
                          <span className="font-semibold text-slate-800">{project.area}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Contactanos y te asesoramos sin compromiso sobre la mejor solución para tu obra.
          </p>
          <a
            href="https://wa.me/5492494517644"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-sm hover:bg-green-700 transition-colors shadow-lg"
          >
            <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Solicitar Cotización
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} GALTECH — Ingeniería y Estructuras Metálicas. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsPage;
