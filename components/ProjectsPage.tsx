import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { LOGO_BASE64, CATEGORIES } from '../constants';

function GalleryCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(images.map(() => false));
  // Imágenes que ya fueron renderizadas al menos una vez (no volver a desmontar)
  const [renderedSet, setRenderedSet] = useState<Set<number>>(new Set([0]));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addToRendered = (index: number) => {
    const next = (index + 1) % images.length;
    setRenderedSet((prev) => {
      if (prev.has(index) && prev.has(next)) return prev;
      const s = new Set(prev);
      s.add(index);
      s.add(next);
      return s;
    });
  };

  const startAutoplay = () => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % images.length;
        addToRendered(next);
        return next;
      });
    }, 3500);
  };

  useEffect(() => {
    addToRendered(0);
    startAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length]);

  const go = (dir: 1 | -1) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent((prev) => {
      const next = (prev + dir + images.length) % images.length;
      addToRendered(next);
      return next;
    });
    startAutoplay();
  };

  const markLoaded = (i: number) => {
    setLoaded((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-sm bg-slate-800" style={{ aspectRatio: '16/9' }}>
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {renderedSet.has(i) && !loaded[i] && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
          {renderedSet.has(i) && (
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onLoad={() => markLoaded(i)}
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80';
                markLoaded(i);
              }}
            />
          )}
        </div>
      ))}

      {/* Controles */}
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
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (timerRef.current) clearInterval(timerRef.current);
              setCurrent(i);
              startAutoplay();
            }}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

const ProjectsPage = ({ initialCategory = null }: { initialCategory?: string | null }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const selectedCat = CATEGORIES.find((c) => c.key === activeCategory) ?? null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => {
    const isValid = initialCategory && CATEGORIES.some((c) => c.key === initialCategory);
    setActiveCategory(isValid ? initialCategory : null);
  }, [initialCategory]);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="#/" className="flex-shrink-0">
            <img src={LOGO_BASE64} alt="GALTECH" className="h-10 sm:h-12 w-auto" />
          </a>
          {activeCategory ? (
            <button
              onClick={() => setActiveCategory(null)}
              className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-galtech-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a rubros
            </button>
          ) : (
            <a
              href="#/"
              className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-galtech-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </a>
          )}
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-galtech-accent mb-3">
            NUESTROS PROYECTOS
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {selectedCat ? selectedCat.label : 'Proyectos por rubro'}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            {selectedCat
              ? selectedCat.description
              : 'Seleccioná un rubro para ver la galería de obras ejecutadas por Galtech.'}
          </p>
        </div>
      </section>

      {/* Vista: listado de categorías */}
      {!selectedCat && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="group text-left bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  {/* Imagen de preview (primera del carrusel) */}
                  <div className="h-48 overflow-hidden relative bg-slate-800">
                    <img
                      src={cat.images[0]}
                      alt={cat.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-galtech-accent transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{cat.description}</p>
                    <span className="inline-flex items-center mt-4 text-sm font-semibold text-galtech-accent">
                      Ver galería
                      <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Vista: galería de categoría */}
      {selectedCat && (
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <GalleryCarousel images={selectedCat.images} />
            <p className="mt-4 text-sm text-slate-400 text-center">
              Deslizá o usá las flechas para ver más imágenes de esta categoría.
            </p>

            {/* Grid de miniaturas */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedCat.images.map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-sm bg-slate-100">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} GALTECH — Ingeniería y Estructuras Metálicas. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsPage;
