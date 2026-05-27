import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './carousel';

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
}

const Gallery4 = ({
  title = 'Proyectos por rubro',
  description = 'Seleccioná un rubro para ver la galería de obras ejecutadas.',
  items,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    update();
    carouselApi.on('select', update);
    return () => { carouselApi.off('select', update); };
  }, [carouselApi]);

  return (
    <div>
      {/* Encabezado con flechas */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="inline-block text-[#ff8727] font-bold uppercase tracking-widest text-sm mb-3">
            Nuestros proyectos
          </span>
          <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
          <p className="mt-3 text-gray-500 max-w-2xl">{description}</p>
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Anterior"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Siguiente"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carrusel */}
      <Carousel
        setApi={setCarouselApi}
        opts={{ dragFree: true }}
      >
        <CarouselContent className="ml-0">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="max-w-[300px] pl-5 sm:max-w-[320px] lg:max-w-[360px]"
            >
              <a href={item.href} className="group block rounded-xl">
                <div className="relative overflow-hidden rounded-xl min-h-[22rem] md:min-h-[24rem]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-900/85" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-lg font-semibold text-white mb-2 leading-snug">
                      {item.title}
                    </p>
                    <p className="text-sm text-white/75 line-clamp-2 mb-5">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center text-sm font-semibold text-[#ff8727]">
                      Ver galería
                      <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots indicadores */}
      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => carouselApi?.scrollTo(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentSlide === i ? 'bg-[#ff8727]' : 'bg-slate-300'
            }`}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export { Gallery4 };
