import React, { useState } from 'react';
import { CategoryDef } from '../../constants';

interface AccordionItemProps {
  item: CategoryDef;
  isActive: boolean;
  onMouseEnter: () => void;
  onActivate: () => void;
  onNavigate: () => void;
}

const AccordionItem = ({ item, isActive, onMouseEnter, onActivate, onNavigate }: AccordionItemProps) => {
  const handleClick = () => {
    if (isActive) {
      onNavigate();
    } else {
      onActivate();
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden cursor-pointer rounded-sm min-w-0 min-h-0
        transition-all duration-700 ease-in-out
        ${isActive ? 'flex-[5] md:flex-[6]' : 'flex-[1]'}
      `}
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
    >
      <img
        src={item.images[0]}
        alt={item.label}
        className="absolute inset-0 w-full h-full object-cover"
        // Imagen activa: máxima prioridad. Inactivas: baja prioridad para no saturar el ancho de banda
        fetchPriority={isActive ? 'high' : 'low'}
        loading={isActive ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80';
        }}
      />

      <div
        className={`absolute inset-0 bg-black transition-opacity duration-700 ${
          isActive ? 'opacity-40' : 'opacity-70'
        }`}
      />

      {isActive && (
        <span
          className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 text-xs font-bold bg-[#ff8727] text-white z-10"
          onClick={(e) => { e.stopPropagation(); onNavigate(); }}
        >
          Ver galería →
        </span>
      )}

      <span
        className={`
          absolute text-white font-bold pointer-events-none
          transition-all duration-500 ease-in-out
          ${isActive
            ? 'bottom-4 left-4 text-sm md:text-base rotate-0 opacity-100 whitespace-normal max-w-[calc(100%-2rem)]'
            : 'top-1/2 left-4 md:left-1/2 -translate-y-1/2 md:-translate-x-1/2 md:rotate-90 whitespace-nowrap text-xs opacity-90'
          }
        `}
      >
        {item.label}
      </span>
    </div>
  );
};

interface ImageAccordionProps {
  categories: CategoryDef[];
}

export function ImageAccordion({ categories }: ImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full h-[560px] md:h-[420px]">
      {categories.map((cat, index) => (
        <AccordionItem
          key={cat.key}
          item={cat}
          isActive={index === activeIndex}
          onMouseEnter={() => setActiveIndex(index)}
          onActivate={() => setActiveIndex(index)}
          onNavigate={() => {
            window.location.hash = `/proyectos/${cat.key}`;
          }}
        />
      ))}
    </div>
  );
}
