import React from 'react';
import { LOGO_BASE64 } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="col-span-1 md:col-span-1">
             <img src={LOGO_BASE64} alt="GALTECH" className="h-10 mb-4 brightness-0 invert opacity-80" />
             <p className="text-sm">
               Ingeniería, fabricación y montaje de estructuras metálicas en toda la Argentina.
             </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a></li>
              <li><a href="#diferencial" className="hover:text-orange-500 transition-colors">Nosotros</a></li>
              <li><a href="#obras" className="hover:text-orange-500 transition-colors">Obras Realizadas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>ventas@galtech.com.ar</li>
              <li>+54 9 2494 51-7644</li>
              <li>Parque Industrial, Buenos Aires, Argentina</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Legales</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 text-xs text-center">
          <p>&copy; {new Date().getFullYear()} Galtech S.A. Todos los derechos reservados.</p>
          <p className="mt-2 text-slate-600">Map data &copy; <a href="https://www.openstreetmap.org/" className="hover:underline">OpenStreetMap</a> contributors</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;