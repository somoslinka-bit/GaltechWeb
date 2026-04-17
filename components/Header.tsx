import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { LOGO_BASE64 } from '../constants';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Diferencial', href: '#diferencial' },
    { name: 'Proyectos', href: '#obras' },
    { name: 'Proceso', href: '#proceso' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#/" className="flex-shrink-0">
          <img 
            src={LOGO_BASE64} 
            alt="GALTECH" 
            className= "h-10 sm:h-12 w-auto transition-all"
        
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium uppercase tracking-wider hover:text-galtech-accent transition-colors ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contacto"
            className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-sm text-white bg-galtech-accent hover:bg-galtech-accent transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            Cotizar
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-md ${isScrolled ? 'text-slate-900' : 'text-white'}`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 text-white shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="block px-3 py-4 text-base font-medium hover:text-galtech-accent w-full text-center border-b border-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contacto"
              className="mt-4 inline-flex items-center px-8 py-3 text-base font-bold rounded-sm text-white bg-orange-600 hover:bg-galtech-accent w-full justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Solicitar Cotización
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;