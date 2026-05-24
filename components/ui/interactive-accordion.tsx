import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AccordionItem {
  id: string;
  number: string;
  icon: string;
  title: string;
  content: string;
}

interface InteractiveAccordionProps {
  items: AccordionItem[];
  defaultActiveId?: string | null;
}

export function InteractiveAccordion({ items, defaultActiveId = null }: InteractiveAccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultActiveId);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full space-y-0">
      {items.map((item, index) => {
        const isActive = activeId === item.id;
        const isHovered = hoveredId === item.id;

        return (
          <div key={item.id}>
            <motion.button
              onClick={() => setActiveId(isActive ? null : item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="w-full group relative"
              initial={false}
            >
              <div className="flex items-center gap-5 py-5 px-1">
                {/* Número con círculo animado */}
                <div className="relative flex items-center justify-center w-10 h-10 flex-shrink-0">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : isHovered ? 0.85 : 0,
                      opacity: isActive ? 1 : isHovered ? 0.12 : 0,
                      backgroundColor: isActive ? '#ff8727' : '#0f172a',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                  <motion.span
                    className="relative z-10 text-sm font-medium tracking-wide"
                    animate={{ color: isActive ? '#ffffff' : '#94a3b8' }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.number}
                  </motion.span>
                </div>

                {/* Ícono */}
                <span className="text-xl flex-shrink-0">{item.icon}</span>

                {/* Título */}
                <motion.h3
                  className="text-lg font-semibold tracking-tight text-left flex-1"
                  animate={{
                    x: isActive || isHovered ? 4 : 0,
                    color: isActive ? '#0f172a' : isHovered ? '#0f172a' : '#94a3b8',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  {item.title}
                </motion.h3>

                {/* Indicador + / × */}
                <motion.div
                  className="flex items-center justify-center w-8 h-8 flex-shrink-0"
                  animate={{ rotate: isActive ? 45 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    animate={{ opacity: isActive || isHovered ? 1 : 0.35 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      d="M8 1V15M1 8H15"
                      stroke="#0f172a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </motion.div>
              </div>

              {/* Línea base */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200" />
              {/* Línea animada naranja */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-[#ff8727] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive ? 1 : isHovered ? 0.3 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </motion.button>

            {/* Contenido expandible */}
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2, delay: 0.1 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.1 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <motion.p
                    className="pl-[60px] pr-10 py-5 text-slate-600 leading-relaxed text-sm"
                    initial={{ y: -8 }}
                    animate={{ y: 0 }}
                    exit={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    {item.content}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
