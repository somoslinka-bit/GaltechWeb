import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';

export interface ServiceCardData {
  title: string;
  description: string;
  imageUrl: string;
  color: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  imageUrl: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const StackingCard = ({
  i,
  title,
  description,
  imageUrl,
  color,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="relative flex flex-col md:flex-row -top-[10%] h-[420px] w-[85%] max-w-5xl rounded-sm origin-top overflow-hidden shadow-2xl"
      >
        {/* Texto */}
        <div className="flex flex-col justify-center p-8 md:p-12 w-full md:w-[45%] shrink-0">
          <span className="text-[#ff8727] text-xs font-bold uppercase tracking-widest mb-3">
            Soluciones Galtech
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
            {title}
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            {description}
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-[#ff8727] font-semibold text-sm hover:gap-3 transition-all"
          >
            Consultar
            <svg width="18" height="10" viewBox="0 0 22 12" fill="none">
              <path
                d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                fill="#ff8727"
              />
            </svg>
          </a>
        </div>

        {/* Imagen */}
        <div className="relative w-full md:w-[55%] h-48 md:h-full overflow-hidden">
          <motion.div className="w-full h-full" style={{ scale: imageScale }}>
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
          {/* overlay sutil para unificar con el color de la card */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundColor: color }} />
        </div>
      </motion.div>
    </div>
  );
};
