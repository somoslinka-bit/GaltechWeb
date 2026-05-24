import React, { useState } from 'react';
import { CategoryDef } from '../../constants';

interface AccordionItemProps {
  item: CategoryDef;
  isActive: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}

const AccordionItem = ({ item, isActive, onMouseEnter, onClick }: AccordionItemProps) => {
  return (
    <div
      className={`
        relative overflow-hidden cursor-pointer rounded-sm min-w-0
        transition-all duration-700 ease-in-out
        ${isActive ? 'flex-[6]' : 'flex-[1]'}
      `}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <img
        src={item.images[0]}
        alt={item.label}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80';
        }}
      />

      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isActive ? 'bg-black/40' : 'bg-black/60'
        }`}
      />

      {isActive && (
        <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 text-xs font-bold bg-[#ff8727] text-white">
          Ver galería →
        </span>
      )}

      <span
        className={`
          absolute text-white font-bold whitespace-nowrap
          transition-all duration-500 ease-in-out pointer-events-none
          ${isActive
            ? 'bottom-5 left-4 text-base rotate-0 opacity-100'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 text-xs opacity-90'
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
    <div className="flex flex-row gap-2 w-full h-[420px]">
      {categories.map((cat, index) => (
        <AccordionItem
          key={cat.key}
          item={cat}
          isActive={index === activeIndex}
          onMouseEnter={() => setActiveIndex(index)}
          onClick={() => {
            window.location.hash = `/proyectos/${cat.key}`;
          }}
        />
      ))}
    </div>
  );
}
