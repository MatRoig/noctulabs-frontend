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
  // --- ESTADO DE IDIOMA ---

    const { t, lang, setLang } = useTranslation();

  // --- ESTADO DE LA CORTINA CINEMATOGRÁFICA ---

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // --- CANVAS DE PARTÍCULAS INTERACTIVAS ---

  return (
    <div className="min-h-screen bg-noct-bg text-white font-sans selection:bg-noct-neon selection:text-black overflow-x-hidden relative">
      <ParticlesBackground />

      {/* CORTINA */}
      <div className={`fixed inset-0 z-[9999] pointer-events-none flex flex-col ${loading ? '' : 'invisible'}`}>
        <div className="w-full h-1/2 bg-[#060413] curtain-panel flex items-end justify-center overflow-hidden" style={{ transform: loading ? 'translateY(0)' : 'translateY(-100%)' }}>
          <div className="h-0 flex items-center justify-center relative bottom-0">
            <img src="/logo-noctulabs.png.jpeg" alt="Logo" className={`h-32 sm:h-48 max-w-none object-contain origin-center ${loading ? 'animate-owl-drop' : ''}`} style={{ transform: 'translateY(50%)' }} />
          </div>
        </div>
        <div className="w-full h-1/2 bg-[#060413] curtain-panel flex items-start justify-center overflow-hidden" style={{ transform: loading ? 'translateY(0)' : 'translateY(100%)' }}>
          <div className="h-0 flex items-center justify-center relative top-0">
            <img src="/logo-noctulabs.png.jpeg" alt="Logo" className={`h-32 sm:h-48 max-w-none object-contain origin-center ${loading ? 'animate-owl-drop' : ''}`} style={{ transform: 'translateY(-50%)' }} />
          </div>
        </div>
      </div>

      {/* NAVBAR */}

      <Navbar t={t} lang={lang} setLang={setLang} />

      {/* HERO */}

      <Hero t={t} />

      {/* SERVICIOS */}

      <Services t={t} />

      {/* PROYECTOS */}

      <Projects t={t} lang={lang} />

      {/* CALCULADORA */}

      <Calculator t={t} />

      {/* HISTORIA & EQUIPO */}

      <TeamSection t={t} />

      {/* CONTACTO */}

      <ContactForm t={t} />

      {/* FOOTER */}

      <Footer lang={lang} />

      {/* TERMINAL FLOTANTE */}

      <Terminal t={t} lang={lang} />

    </div>
  );
}

export default App;