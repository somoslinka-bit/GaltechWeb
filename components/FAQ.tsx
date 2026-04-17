import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqGroup {
  category: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqGroup[] = [
  {
    category: 'Sobre nuestros servicios',
    items: [
      {
        question: '¿Qué tipo de obras realiza Galtech?',
        answer:
          'Nos especializamos en el diseño, fabricación y montaje de estructuras metálicas de gran escala, incluyendo naves industriales, centros logísticos, depósitos, espacios comerciales y estructuras para el sector ganadero y agropecuario.',
      },
      {
        question: '¿Ofrecen proyectos "Llave en Mano"?',
        answer:
          'Sí. Ofrecemos un servicio integral que abarca desde la ingeniería inicial y el cálculo estructural hasta la entrega final de la obra lista para ser utilizada. También podemos integrarnos a proyectos en marcha para etapas específicas de fabricación o montaje.',
      },
      {
        question: '¿Realizan ampliaciones o solo obras nuevas?',
        answer:
          'Ejecutamos proyectos desde cero y también intervenimos en estructuras existentes para realizar ampliaciones, refuerzos o adecuaciones funcionales.',
      },
    ],
  },
  {
    category: 'Logística y Calidad',
    items: [
      {
        question: '¿Cuentan con equipos propios de transporte y montaje?',
        answer:
          'Sí. Disponemos de logística integral, incluyendo flota de camiones, grúas y equipos de montaje propios. Esto nos permite garantizar el cumplimiento de los plazos y un control absoluto sobre la seguridad y ejecución en obra.',
      },
      {
        question: '¿Cómo garantizan la calidad de sus estructuras?',
        answer:
          'Trabajamos bajo procesos estandarizados y materiales certificados. La calidad se asegura a través de nuestro Departamento de Ingeniería y Seguimiento, que brinda soporte técnico constante y supervisión tanto en nuestra planta industrial como en cada punto de montaje.',
      },
    ],
  },
  {
    category: 'Presupuestos y Financiación',
    items: [
      {
        question: '¿Qué métodos de pago y financiación ofrecen?',
        answer:
          'Diseñamos esquemas de pago adaptados a la escala de cada proyecto y a las necesidades de cada cliente. Contamos con opciones de financiación directa y disponemos de convenios vigentes con bancos públicos y privados para facilitar el acceso a líneas de crédito productivas.',
      },
      {
        question: '¿De qué depende el costo de una obra?',
        answer:
          'El presupuesto se define según las dimensiones, el tipo de estructura, la ubicación de la obra, la complejidad del diseño y las terminaciones requeridas.',
      },
      {
        question: '¿Cómo puedo solicitar un presupuesto?',
        answer:
          'Podés contactarnos vía WhatsApp o a través de nuestro formulario web. Para una respuesta más precisa, te sugerimos indicarnos la ubicación de la obra, las medidas estimadas (largo, ancho y alto) y el uso que tendrá el espacio.',
      },
    ],
  },
];

const AccordionItem = ({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
      aria-expanded={isOpen}
    >
      <span className={`text-base font-semibold transition-colors duration-200 ${isOpen ? 'text-galtech-accent' : 'text-slate-900 group-hover:text-galtech-accent'}`}>
        {item.question}
      </span>
      <ChevronDown
        size={20}
        className={`flex-shrink-0 text-galtech-accent transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
    >
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.answer}</p>
    </div>
  </div>
);

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-galtech-accent mb-2">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-10">
          {FAQ_DATA.map((group) => (
            <div key={group.category}>
              <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 pb-2 border-b border-gray-200">
                {group.category}
              </h3>
              <div>
                {group.items.map((item, idx) => {
                  const key = `${group.category}-${idx}`;
                  return (
                    <AccordionItem
                      key={key}
                      item={item}
                      isOpen={!!openItems[key]}
                      onToggle={() => toggleItem(key)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
