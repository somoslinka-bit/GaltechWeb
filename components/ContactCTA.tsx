import React from 'react';
import { MessageSquare, Mail } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section id="contacto" className="py-24 bg-slate-900 text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          ¿Tenés un proyecto en mente?
        </h2>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Contanos tu idea. Nuestro equipo técnico analizará la viabilidad y te brindará una cotización a medida.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <a 
            href="https://wa.me/5492494517644" // Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-sm hover:bg-green-700 transition-colors"
          >
            <MessageSquare className="mr-2 w-5 h-5" />
            WhatsApp Ventas
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;