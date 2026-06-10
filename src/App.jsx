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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-noct-bg text-white font-sans selection:bg-noct-neon selection:text-black relative">
      <ParticlesBackground />

      {/* CORTINA - Corregimos el manejo de visibilidad para no bloquear el clic */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col transition-opacity duration-500">
          <div className="w-full h-1/2 bg-[#060413] flex items-end justify-center overflow-hidden transition-transform duration-700 ease-in-out" style={{ transform: loading ? 'translateY(0)' : 'translateY(-100%)' }}>
            <div className="h-0 flex items-center justify-center relative bottom-0">
              <img src="/logo-noctulabs.png.jpeg" alt="Logo" className="h-32 sm:h-48 animate-owl-drop" style={{ transform: 'translateY(50%)' }} />
            </div>
          </div>
          <div className="w-full h-1/2 bg-[#060413] flex items-start justify-center overflow-hidden transition-transform duration-700 ease-in-out" style={{ transform: loading ? 'translateY(0)' : 'translateY(100%)' }}>
            <div className="h-0 flex items-center justify-center relative top-0">
              <img src="/logo-noctulabs.png.jpeg" alt="Logo" className="h-32 sm:h-48 animate-owl-drop" style={{ transform: 'translateY(-50%)' }} />
            </div>
          </div>
        </div>
      )}

      <Navbar t={t} lang={lang} setLang={setLang} />

      <main className="relative z-10 w-full">
        <Hero t={t} />
        <Services t={t} />
        <Projects t={t} lang={lang} />
        <Calculator t={t} />
        <TeamSection t={t} />
        <ContactForm t={t} />
        <Footer lang={lang} />
      </main>

      <Terminal t={t} lang={lang} />
    </div>
  );
}

export default App;