import { useEffect, useState, lazy, Suspense } from 'react';
import useTranslation from './hooks/useTranslation';
import './index.css';
import ParticlesBackground from './components/ParticlesBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';

const Projects = lazy(() => import('./components/Projects'));
const Calculator = lazy(() => import('./components/Calculator'));
const TeamSection = lazy(() => import('./components/TeamSection'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));
const Terminal = lazy(() => import('./components/Terminal'));

function App() {
  const { t, lang, setLang } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [curtainClosing, setCurtainClosing] = useState(false);

  useEffect(() => {
    let removeTimer;
    const timer = setTimeout(() => {
      setCurtainClosing(true);
      removeTimer = setTimeout(() => setLoading(false), 700);
    }, 1200);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
        <Suspense fallback={null}>
          <Hero t={t} />
          <Services t={t} />
          <Projects t={t} lang={lang} />
          <Calculator t={t} />
          <TeamSection t={t} />
          <ContactForm t={t} />
          <Footer lang={lang} />
        </Suspense>
      </main>

      {/* TERMINAL   FLOTANTE */}
      <Suspense fallback={null}>
        <Terminal t={t} />
      </Suspense>
    </div>
  );
}

export default App;