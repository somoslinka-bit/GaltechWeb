import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from "./components/About";
import Clients from './components/Clients';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import ProjectsMap from './components/ProjectsMap';
import Process from './components/Process';
import FAQ from './components/FAQ';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import ProjectsPage from './components/ProjectsPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'proyectos'>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/proyectos') {
        setCurrentPage('proyectos');
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        });
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'proyectos') {
    return <ProjectsPage />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-galtech-accent selection:text-galtech-accent">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Clients />
        <ProjectsMap />
        <Process />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;