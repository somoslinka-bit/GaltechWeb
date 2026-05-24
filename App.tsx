import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from "./components/About";
import Clients from './components/Clients';
import Services from './components/Services';
import ProjectsMap from './components/ProjectsMap';
import ComingSoon from './components/ComingSoon';
import Process from './components/Process';
import FAQ from './components/FAQ';
import ContactCTA from './components/ContactCTA';
import JobApplication from './components/JobApplication';
import Footer from './components/Footer';
import ProjectsPage from './components/ProjectsPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'proyectos'>('home');
  const [initialCategory, setInitialCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/proyectos')) {
        const parts = hash.split('/');
        const cat = parts[2] ?? null;
        setInitialCategory(cat || null);
        setCurrentPage('proyectos');
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        });
      } else {
        setCurrentPage('home');
        setInitialCategory(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'proyectos') {
    return <ProjectsPage initialCategory={initialCategory} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-galtech-accent selection:text-galtech-accent">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Clients />
        <ProjectsMap />
        <ComingSoon />
        <Process />
        <FAQ />
        <ContactCTA />
        <JobApplication />
      </main>
      <Footer />
    </div>
  );
}

export default App;