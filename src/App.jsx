import { useEffect, useState } from 'react';
import useTranslation from './hooks/useTranslation';
import './index.css';
import ParticlesBackground from './components/ParticlesBackground';
import Terminal from './components/Terminal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Calculator from './components/Calculator';
import TeamSection from './components/TeamSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const { t, lang, setLang } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [curtainClosing, setCurtainClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurtainClosing(true);
      const removeTimer = setTimeout(() => setLoading(false), 700);
      return () => clearTimeout(removeTimer);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-noct-bg text-white font-sans selection:bg-noct-neon selection:text-black relative">
      <ParticlesBackground />

      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col">
          <div className="w-full h-1/2 bg-[#060413] flex items-end justify-center overflow-hidden transition-transform duration-700 ease-in-out" style={{ transform: curtainClosing ? 'translateY(-100%)' : 'translateY(0)' }}>
            <div className="h-0 flex items-center justify-center relative bottom-0">
              <img src="/logo-noctulabs.png.jpeg" alt="Logo" className="h-32 sm:h-48 animate-owl-drop" style={{ transform: 'translateY(50%)' }} />
            </div>
          </div>
          <div className="w-full h-1/2 bg-[#060413] flex items-start justify-center overflow-hidden transition-transform duration-700 ease-in-out" style={{ transform: curtainClosing ? 'translateY(100%)' : 'translateY(0)' }}>
            <div className="h-0 flex items-center justify-center relative top-0">
              <img src="/logo-noctulabs.png.jpeg" alt="Logo" className="h-32 sm:h-48 animate-owl-drop" style={{ transform: 'translateY(-50%)' }} />
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR: Se mantiene arriba del contenido */}
      <Navbar t={t} lang={lang} setLang={setLang} />

      {/* CONTENIDO PRINCIPAL */}
      <main className="relative z-10 w-full">
        <Hero t={t} />
        <Services t={t} />
        <Projects t={t} lang={lang} />
        <Calculator t={t} />
        <TeamSection t={t} />
        <ContactForm t={t} />
        <Footer lang={lang} />
      </main>

      {/* TERMINAL   FLOTANTE */}
      <Terminal t={t} />
    </div>
  );
}

export default App;