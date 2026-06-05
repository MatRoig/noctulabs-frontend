import React, { useState, useEffect } from 'react';
import './index.css';

// =========================================================================
// --- DICCIONARIO DE TRADUCCIONES (ESPAÑOL / INGLÉS) ---
// =========================================================================
const translations = {
  es: {
    nav: { start: 'Inicio', services: 'Servicios', projects: 'Proyectos', calc: 'Calculadora', team: 'Equipo', contact: 'Contacto', btn: 'Hablemos' },
    hero: { title1: 'Creamos sitios', title2: 'web que trabajan', title3: 'mientras', title4: 'duermes', sub: 'Desarrollo web creativo, rápido y funcional para potenciar tu negocio en el mundo digital.', btn1: 'Usar Calculadora ⚡', btn2: 'Ver Qué Hacemos >', badge1: 'Entrega rápida', badge2: 'Webs seguras', badge3: '100% Responsivas' },
    services: { mini: 'Servicios', title: '¿QUÉ HACEMOS?', s1: 'Sitios Web', s1_d: 'Páginas modernas, rápidas y optimizadas para tu negocio (Webs vitrina).', s2: 'Tiendas Online', s2_d: 'E-commerce seguros y fáciles de administrar con pasarela de pago.', s3: 'Aplicaciones Web', s3_d: 'Sistemas a la medida para automatizar tus procesos en Java.', s4: 'Landing Pages', s4_d: 'Páginas que convierten visitantes en clientes y portafolios.' },
    projects: { title: 'Proyectos Destacados', btn: 'Ver más proyectos >' },
    calc: { mini: 'Simulador Digital', title: 'Calcula tu Alcance en tiempo real', sub: 'Selecciona las especificaciones de tu idea y mira cómo nuestro algoritmo estima las semanas de desarrollo.', label1: '1. Tipo de Software Principal', opt1: 'Página Vitrina / Portafolio', opt2: 'E-Commerce con Catálogo Completo', opt3: 'Aplicación a Medida / Sistema Complejo', label2: '2. Módulos Adicionales Necesarios', check1: 'Integración de Pasarela de Pago', check1_sub: 'Transacciones e-commerce Webpay, Stripe o PayPal.', check2: 'Autenticación y Perfiles de Usuario', check2_sub: 'Logins de clientes seguros y Base de Datos protegida.', dev: '// Desarrollo Noctulabs', est: 'Tiempo Estimado de Entrega:', weeks: 'Semanas', footer: 'Código limpio, estructurado y optimizado.', btn: 'Cotizar este desarrollo ↗' },
    about: { mini: 'Nuestra Historia', title: 'NOCTULABS - DIGITAL SOLUTION', p1: 'Comenzamos en', p2: 'un bootcamp tech donde consolidamos nuestro desempeño trabajando en nuestra primera pyme:', p3: 'dedicada a crear alfombras personalizadas con la técnica tufting. Tras ver los excelentes resultados y nuestra cohesión técnica como equipo de 6 Desarrolladores Full Stack Java, decidimos dar el paso y formalizarnos como', p4: 'ofreciendo servicios web personalizados a todo América y Europa.', teamTitle: '// El Equipo de Ingeniería', connect: 'Conectar' },
    contact: { title: '¿Tienes un', title2: 'proyecto', title3: 'en mente?', sub: 'Cuéntanos tu idea y te ayudaremos a hacerla realidad. Diseñamos soluciones seguras con alta capacidad backend.', name: 'Tu nombre', email: 'Tu correo electrónico', company: 'Nombre de tu empresa (opcional)', msg: 'Cuéntanos sobre tu proyecto...', btn: 'Enviar Mensaje' },
    terminal: { welcome: 'NOCTULABS_OS v2.6.0 - INICIALIZADO CON ÉXITO', help_msg: 'Escribe "help" para ver los comandos disponibles.', help: 'Comandos disponibles:', t_desc: 'Muestra las especialidades del equipo', p_desc: 'Diagnóstico de latencia de servidores', c_desc: 'Limpiar consola', s_desc: 'Desencriptar transmisión del sistema', unknown: 'No se reconoce el comando. Escribe "help".', secret: '🦉 MENSAJE DESENCRIPTADO: "Mientras el resto del mundo duerme, nosotros construimos el futuro digital."' }
  },
  en: {
    nav: { start: 'Home', services: 'Services', projects: 'Projects', calc: 'Calculator', team: 'Team', contact: 'Contact', btn: "Let's Talk" },
    hero: { title1: 'We create', title2: 'websites that work', title3: 'while you', title4: 'sleep', sub: 'Creative, fast, and functional web development to empower your business in the digital world.', btn1: 'Use Calculator ⚡', btn2: 'What We Do >', badge1: 'Fast delivery', badge2: 'Secure websites', badge3: '100% Responsive' },
    services: { mini: 'Services', title: 'WHAT WE DO', s1: 'Websites', s1_d: 'Modern, fast, and optimized pages for your business (Showcase sites).', s2: 'Online Stores', s2_d: 'Secure and easy-to-manage e-commerce with payment gateways.', s3: 'Web Applications', s3_d: 'Custom systems to automate your processes using Java.', s4: 'Landing Pages', s4_d: 'Pages that convert visitors into customers and portfolios.' },
    projects: { title: 'Featured Projects', btn: 'See more projects >' },
    calc: { mini: 'Digital Simulator', title: 'Calculate your Scope in real-time', sub: 'Select your idea specifications and watch our algorithm estimate development weeks.', label1: '1. Main Software Type', opt1: 'Showcase Page / Portfolio', opt2: 'E-Commerce with Full Catalog', opt3: 'Custom App / Complex System', label2: '2. Additional Modules Needed', check1: 'Payment Gateway Integration', check1_sub: 'E-commerce transactions via Webpay, Stripe, or PayPal.', check2: 'Auth & User Profiles', check2_sub: 'Secure customer logins and protected Database.', dev: '// Noctulabs Development', est: 'Estimated Delivery Time:', weeks: 'Weeks', footer: 'Clean, structured, and optimized code.', btn: 'Quote this project ↗' },
    about: { mini: 'Our Story', title: 'NOCTULABS - DIGITAL SOLUTION', p1: 'We started at', p2: 'a tech bootcamp where we consolidated our performance working on our first SME:', p3: 'dedicated to creating custom rugs using the tufting technique. After seeing the excellent results and our cohesion as a team of 6 Full Stack Java Developers, we decided to formalize as', p4: 'offering custom web services to all of America and Europe.', teamTitle: '// Engineering Team', connect: 'Connect' },
    contact: { title: 'Have a', title2: 'project', title3: 'in mind?', sub: 'Tell us your idea and we will help you make it a reality. We design secure solutions with high backend capacity.', name: 'Your name', email: 'Your email', company: 'Company name (optional)', msg: 'Tell us about your project...', btn: 'Send Message' },
    terminal: { welcome: 'NOCTULABS_OS v2.6.0 - INITIALIZED SUCCESSFULLY', help_msg: 'Type "help" to list available terminal commands.', help: 'Available commands:', t_desc: 'Show team specializations', p_desc: 'Server latency diagnostic', c_desc: 'Clear console', s_desc: 'Decrypt system transmission', unknown: 'Command not recognized. Type "help".', secret: '🦉 MESSAGE DECRYPTED: "While the rest of the world sleeps, we build the digital future."' }
  }
};

function App() {
  // --- ESTADO DE IDIOMA ---
  const [lang, setLang] = useState('es');
  const t = translations[lang];

  // --- ESTADOS DE LA CALCULADORA INTERACTIVA ---
  const [projectType, setProjectType] = useState('vitrina');
  const [includePayments, setIncludePayments] = useState(false);
  const [includeAuth, setIncludeAuth] = useState(false);

  // --- ESTADO DE LA CORTINA CINEMATOGRÁFICA ---
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const calculateEstimate = () => {
    let baseWeeks = 2;
    if (projectType === 'ecommerce') baseWeeks = 4;
    if (projectType === 'customApp') baseWeeks = 6;
    if (includePayments) baseWeeks += 1;
    if (includeAuth) baseWeeks += 2;
    return baseWeeks;
  };

  // --- EQUIPO ---
  const teamMembers = [
    { name: 'Miussete Alfaro', role: 'Full Stack Java Developer', linkedin: 'https://www.linkedin.com/in/miu-alfaro/', img: '/team/miussete.png' },
    { name: 'Fernando Cuevas', role: 'Full Stack Java Developer', linkedin: 'https://www.linkedin.com/in/fernandocuevasmunoz/', img: '/team/fernando.png' },
    { name: 'Matias Flores', role: 'Full Stack Java Developer', linkedin: 'https://www.linkedin.com/in/matias-flores-roig/', img: '/team/matias.png' },
    { name: 'Monserrat Miranda', role: 'Full Stack Java Developer', linkedin: 'https://www.linkedin.com/in/monserrat-miranda-medina-2a0948411/', img: '/team/monserrat.png' },
    { name: 'Zuelem Chañillao', role: 'Full Stack Java Developer', linkedin: 'https://www.linkedin.com/in/zuelem-cha%C3%B1illao/', img: '/team/zuelem.png' },
    { name: 'Alonso Morales', role: 'Full Stack Java Developer', linkedin: 'https://www.linkedin.com/in/alonso-morales-l%C3%B3pez-92895627b/', img: '/team/alonso.png' },
  ];

  // --- TERMINAL LOGIC ---
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([t.terminal.welcome, t.terminal.help_msg, '------------------------------------------------']);

  // Actualizar bienvenida si cambia el idioma
  useEffect(() => {
    setTerminalLogs([t.terminal.welcome, t.terminal.help_msg, '------------------------------------------------']);
  }, [lang]);

  const executeCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let response = [];
    if (cleanCmd === 'help') {
      response = [`> ${cmd}`, t.terminal.help, `  team     - ${t.terminal.t_desc}`, `  ping     - ${t.terminal.p_desc}`, `  clear    - ${t.terminal.c_desc}`, `  secret   - ${t.terminal.s_desc}`];
    } else if (cleanCmd === 'team') {
      response = [`> ${cmd}`, 'Core Developers online:', '  * Miussete  -> UI/UX & Java Backend Architect', '  * Fernando  -> Security & Database Engineer', '  * Matias    -> Web Integration Specialist', '  * Monse     -> QA & Performance Analyst', '  * Zuelem    -> Data Logic Specialist', '  * Alonso    -> Tailwind & Core System Architect'];
    } else if (cleanCmd === 'ping') {
      response = [`> ${cmd}`, 'Pinging server nodes...', '  [Node 1: Valparaíso] -> Latency: 8ms (Stable)', '  [Node 2: Santiago]   -> Latency: 12ms (Stable)', '  Diagnostic complete. Status: OPTIMAL'];
    } else if (cleanCmd === 'secret') {
      response = [`> ${cmd}`, t.terminal.secret];
    } else if (cleanCmd === 'clear') { setTerminalLogs([]); return; }
    else { response = [`> ${cmd}`, t.terminal.unknown]; }
    setTerminalLogs(prev => [...prev, ...response]);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    executeCommand(terminalInput);
    setTerminalInput('');
  };

  // --- CANVAS DE PARTÍCULAS INTERACTIVAS ---
  useEffect(() => {
    const canvas = document.getElementById('noct-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId, width = (canvas.width = window.innerWidth), height = (canvas.height = window.innerHeight);
    const handleResize = () => { width = (canvas.width = window.innerWidth); height = (canvas.height = window.innerHeight); };
    window.addEventListener('resize', handleResize);
    const particles = [];
    class Particle {
      constructor() { this.x = Math.random() * width; this.y = Math.random() * height; this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4; this.radius = Math.random() * 2 + 1; }
      update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > width) this.vx *= -1; if (this.y < 0 || this.y > height) this.vy *= -1; }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = 'rgba(157, 78, 221, 0.3)'; ctx.fill(); }
    }
    for (let i = 0; i < 45; i++) particles.push(new Particle());
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 245, 212, ${0.1 * (1 - dist / 110)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <div className="min-h-screen bg-noct-bg text-white font-sans selection:bg-noct-neon selection:text-black overflow-x-hidden relative">
      <canvas id="noct-particles" className="fixed inset-0 pointer-events-none z-0" />

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

      {/* NAVEGACIÓN — FIX: min-w-0 en el contenedor izquierdo, w fijo en logo, shrink-0 en selector, whitespace-nowrap en ul */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-noct-border sticky top-0 bg-noct-bg/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-4 min-w-0">
          <img
            src="/logo-noctulabs.png.jpeg"
            alt="Noctulabs"
            className="h-20 sm:h-40 w-[80px] sm:w-[160px] drop-shadow-[0_0_15px_rgba(157,78,221,0.6)] object-contain shrink-0"
          />
          {/* SELECTOR DE IDIOMA */}
          <div className="flex bg-[#0a0818] border border-noct-border rounded-lg p-1 text-[10px] font-bold shrink-0">
            <button onClick={() => setLang('es')} className={`px-2 py-1 rounded ${lang === 'es' ? 'bg-noct-purple text-white' : 'text-gray-500 hover:text-white'}`}>ES</button>
            <button onClick={() => setLang('en')} className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-noct-purple text-white' : 'text-gray-500 hover:text-white'}`}>EN</button>
          </div>
        </div>
        {/* FIX: whitespace-nowrap evita que los links rompan línea al cambiar idioma */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-300 items-center whitespace-nowrap">
          <li><a href="#inicio" className="hover:text-noct-neon transition">{t.nav.start}</a></li>
          <li><a href="#servicios" className="hover:text-noct-neon transition">{t.nav.services}</a></li>
          <li><a href="#proyectos" className="hover:text-noct-neon transition">{t.nav.projects}</a></li>
          <li><a href="#calculadora" className="hover:text-noct-neon transition">{t.nav.calc}</a></li>
          <li><a href="#nosotros" className="hover:text-noct-neon transition">{t.nav.team}</a></li>
          <li><a href="#contacto" className="hover:text-noct-neon transition">{t.nav.contact}</a></li>
        </ul>
        {/* FIX: min-w fijo en el botón del nav para que no cambie de tamaño */}
        <a href="#contacto" className="bg-noct-purple hover:bg-purple-600 px-6 py-2.5 rounded text-sm font-bold transition-all glow-purple uppercase tracking-wider text-center min-w-[120px] shrink-0">{t.nav.btn}</a>
      </nav>

      {/* HERO */}
      <header id="inicio" className="relative px-6 py-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
        <div className="relative z-10 max-w-xl bg-noct-bg/70 lg:bg-transparent p-6 rounded-xl backdrop-blur-md lg:backdrop-blur-none">
          <h1 className="font-display text-5xl sm:text-7xl font-bold uppercase tracking-wide leading-[0.95] mb-6">
            {t.hero.title1} <br /> {t.hero.title2} <br />
            {t.hero.title3} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-noct-neon italic">{t.hero.title4}</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-md leading-relaxed">{t.hero.sub}</p>
          {/* FIX: min-w fijo en ambos botones para que no cambien tamaño al cambiar idioma */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#calculadora" className="bg-noct-purple hover:bg-purple-600 px-6 py-3 rounded font-bold transition-all glow-purple text-sm uppercase min-w-[210px] text-center">{t.hero.btn1}</a>
            <a href="#servicios" className="border border-noct-border hover:border-noct-neon px-6 py-3 rounded font-bold transition-all text-sm uppercase min-w-[180px] text-center">{t.hero.btn2}</a>
          </div>
          {/* FIX: min-w fijo en cada badge para que no cambien ancho al cambiar idioma */}
          <div className="flex flex-wrap gap-6 text-xs font-semibold tracking-wide text-gray-400 items-center">
            <span className="flex items-center gap-2 min-w-[140px] hover:text-white transition"><span className="text-orange-500 text-lg shrink-0">⚡</span> {t.hero.badge1}</span>
            <span className="flex items-center gap-2 min-w-[140px] hover:text-white transition"><span className="text-noct-neon text-lg shrink-0">🛡️</span> {t.hero.badge2}</span>
            <span className="flex items-center gap-2 min-w-[140px] hover:text-white transition"><span className="text-blue-400 text-lg shrink-0">📱</span> {t.hero.badge3}</span>
          </div>
        </div>
        
        {/* CONTENEDOR DE LA IMAGEN FIX: top-16 y bottom-0 en lugar de top-0 y h-full, object-contain */}
        <div className="absolute right-0 top-16 lg:top-25 bottom-0 w-full lg:w-[105%] z-0 pointer-events-none opacity-40 lg:opacity-100 overflow-hidden">
          <div className="relative w-full h-full">
            <img src="/buho-hero.png.jpeg" alt="Búho" className="object-contain w-full h-full object-right-bottom" />
            <div className="absolute inset-0 bg-gradient-to-r from-noct-bg via-noct-bg/50 to-transparent w-full h-full" />
          </div>
        </div>
      </header>

      {/* SERVICIOS */}
      <section id="servicios" className="relative z-10 px-6 py-20 max-w-7xl mx-auto text-center border-t border-noct-border">
        <p className="text-noct-purple text-xs font-bold tracking-widest uppercase mb-2">{t.services.mini}</p>
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-wide mb-12 uppercase">{t.services.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[ {icon:'💻', t:t.services.s1, d:t.services.s1_d}, {icon:'🛒', t:t.services.s2, d:t.services.s2_d}, {icon:'</>', t:t.services.s3, d:t.services.s3_d}, {icon:'🚀', t:t.services.s4, d:t.services.s4_d} ].map((s,i)=>(
            <div key={i} className="group bg-[#0a0818] border border-noct-border hover:border-noct-purple rounded-xl p-8 transition-all hover:shadow-2xl">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 className="font-bold text-lg mb-3 uppercase text-white">{s.t}</h3>
              <p className="text-sm text-gray-400">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="relative z-10 px-6 py-20 max-w-7xl mx-auto border-t border-noct-border text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wide mb-12 uppercase">{t.projects.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
          <div className="group bg-[#0a0818] border border-noct-border hover:border-orange-500 rounded-xl overflow-hidden transition-all">
            <div className="bg-orange-900/20 h-48 flex items-center justify-center border-b border-noct-border p-6"><h4 className="font-display text-3xl font-bold text-orange-200 uppercase text-center leading-none transition-transform group-hover:scale-105">Café <br/>del Valle</h4></div>
            <div className="p-5 flex justify-between items-center bg-[#0a0818]"><div><h4 className="font-bold text-sm uppercase">Café del Valle</h4><p className="text-xs text-gray-500">{lang === 'es' ? 'Tienda Online' : 'Online Store'}</p></div><span className="text-gray-500 group-hover:text-orange-400">↗</span></div>
          </div>
          <div className="group bg-[#0a0818] border border-noct-border hover:border-blue-500 rounded-xl overflow-hidden transition-all">
            <div className="bg-blue-900/20 h-48 flex items-center justify-center border-b border-noct-border p-6"><h4 className="font-display text-3xl font-bold text-blue-200 uppercase text-center leading-none transition-transform group-hover:scale-105">Gym <br/>Pro</h4></div>
            <div className="p-5 flex justify-between items-center bg-[#0a0818]"><div><h4 className="font-bold text-sm uppercase">Gym Pro</h4><p className="text-xs text-gray-500">{lang === 'es' ? 'Sitio Web Corporativo' : 'Corporate Website'}</p></div><span className="text-gray-500 group-hover:text-blue-400">↗</span></div>
          </div>
          <div className="group bg-[#0a0818] border border-noct-border hover:border-noct-purple rounded-xl overflow-hidden transition-all">
            <div className="h-48 border-b border-noct-border overflow-hidden bg-purple-950/10"><img src="/MFR.png" alt="MFR" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" /></div>
            <div className="p-5 flex justify-between items-center bg-[#0a0818]"><div><h4 className="font-bold text-sm uppercase">My Favorite Rug</h4><p className="text-xs text-gray-500">Landing Page / Tufting</p></div><span className="text-gray-500 group-hover:text-noct-purple">↗</span></div>
          </div>
        </div>
        <button className="border border-noct-border hover:border-noct-neon px-8 py-3 rounded text-sm font-bold uppercase transition-all">{t.projects.btn}</button>
      </section>

      {/* CALCULADORA */}
      <section id="calculadora" className="relative z-10 px-6 py-20 max-w-4xl mx-auto border-t border-noct-border text-center">
        <p className="text-noct-neon text-xs font-bold tracking-widest uppercase mb-2">{t.calc.mini}</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wide mb-4 uppercase">{t.calc.title}</h2>
        <p className="text-gray-400 text-sm mb-12 max-w-lg mx-auto">{t.calc.sub}</p>
        <div className="border-2 border-noct-border rounded-2xl p-6 sm:p-10 text-left grid grid-cols-1 md:grid-cols-2 gap-8 shadow-2xl bg-[#0a0818] hover:border-noct-purple transition-colors">
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase font-bold text-gray-400 mb-2">{t.calc.label1}</label>
              <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-purple transition-colors">
                <option value="vitrina">{t.calc.opt1}</option>
                <option value="ecommerce">{t.calc.opt2}</option>
                <option value="customApp">{t.calc.opt3}</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="block text-xs uppercase font-bold text-gray-400">{t.calc.label2}</label>
              <label className="flex items-center gap-3 bg-[#060413]/60 p-3 rounded border border-noct-border hover:border-noct-neon transition-colors cursor-pointer">
                <input type="checkbox" checked={includePayments} onChange={(e) => setIncludePayments(e.target.checked)} className="w-4 h-4 accent-noct-purple shrink-0" />
                <div><p className="text-sm font-bold">{t.calc.check1}</p><p className="text-xs text-gray-500">{t.calc.check1_sub}</p></div>
              </label>
              <label className="flex items-center gap-3 bg-[#060413]/60 p-3 rounded border border-noct-border hover:border-noct-neon transition-colors cursor-pointer">
                <input type="checkbox" checked={includeAuth} onChange={(e) => setIncludeAuth(e.target.checked)} className="w-4 h-4 accent-noct-purple shrink-0" />
                <div><p className="text-sm font-bold">{t.calc.check2}</p><p className="text-xs text-gray-500">{t.calc.check2_sub}</p></div>
              </label>
            </div>
          </div>
          <div className="bg-[#060413] border border-noct-border rounded-xl p-6 flex flex-col justify-between text-center relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-noct-purple/10 rounded-full blur-2xl pointer-events-none" />
            <div><span className="text-noct-neon text-xs font-mono block mb-4 uppercase">{t.calc.dev}</span><p className="text-gray-400 text-sm">{t.calc.est}</p><h4 className="text-6xl sm:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300 my-4">~ {calculateEstimate()} <span className="text-xl font-sans text-noct-neon">{t.calc.weeks}</span></h4></div>
            <div className="space-y-4 relative z-10">
              <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-noct-purple to-noct-neon h-full transition-all duration-500" style={{ width: `${(calculateEstimate() / 9) * 100}%` }} /></div>
              <p className="text-xs text-gray-500 leading-relaxed">{t.calc.footer}</p>
              <a href="#contacto" className="block bg-noct-purple hover:bg-purple-600 text-white font-bold py-3 px-4 rounded text-xs uppercase transition-all glow-purple">{t.calc.btn}</a>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORIA & EQUIPO */}
      <section id="nosotros" className="relative z-10 px-6 py-20 max-w-6xl mx-auto border-t border-noct-border text-center">
        <p className="text-noct-neon text-xs font-bold tracking-widest uppercase mb-2">{t.about.mini}</p>
        <h2 className="font-display text-3xl font-bold mb-6">{t.about.title}</h2>
        <p className="text-gray-400 text-base leading-relaxed max-w-4xl mx-auto mb-16">
          {t.about.p1} <strong className="text-white font-bold">Generation Chile</strong>, {t.about.p2} <strong className="text-white font-bold">"My favorite Rug"</strong>, {t.about.p3} <strong className="text-noct-neon font-bold">Noctulabs - Digital Solution</strong>, {t.about.p4}
        </p>
        <h3 className="font-display text-xl font-bold tracking-wider text-white uppercase mb-8">{t.about.teamTitle}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-left">
          {teamMembers.map((member, i) => (
            <a key={i} href={member.linkedin} target="_blank" rel="noopener noreferrer" className="group bg-[#0a0818] border border-noct-border hover:border-noct-purple rounded-xl p-4 transition-all hover:-translate-y-1">
              <div className="w-full aspect-square bg-purple-950/20 border border-noct-border rounded-lg overflow-hidden mb-3 flex items-center justify-center relative">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} />
              </div>
              <h4 className="font-bold text-xs sm:text-sm uppercase text-white truncate group-hover:text-noct-neon">{member.name}</h4>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">{member.role}</p>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-noct-border/40 min-w-0">
                <span className="text-[10px] font-bold text-noct-purple uppercase group-hover:text-white truncate">{t.about.connect}</span>
                <span className="text-xs text-gray-600 group-hover:text-noct-purple shrink-0 ml-1">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="relative z-10 px-6 py-20 max-w-5xl mx-auto border-t border-noct-border">
        <div className="bg-[#0a0818] border border-noct-border rounded-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-hidden">
          <div className="flex flex-col justify-center h-full">
            <h3 className="font-display text-4xl sm:text-5xl font-bold uppercase mb-4 leading-[1.1]">{t.contact.title} <span className="text-noct-neon">{t.contact.title2}</span> <br /> {t.contact.title3}</h3>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">{t.contact.sub}</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder={t.contact.name} className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon transition-colors" />
            <input type="email" placeholder={t.contact.email} className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon transition-colors" />
            <input type="text" placeholder={t.contact.company} className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon transition-colors" />
            <textarea placeholder={t.contact.msg} rows="4" className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon transition-colors" required></textarea>
            <button type="submit" className="bg-noct-purple hover:bg-purple-600 px-6 py-3 rounded font-bold transition-all glow-purple text-sm uppercase w-full flex justify-between items-center"><span>{t.contact.btn}</span><span>↗</span></button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-noct-border bg-[#060413] px-6 py-8 mt-10 text-sm text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <img src="/logo-noctulabs.png.jpeg" alt="Logo" className="h-16 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all" />
          <p>© 2026 Noctulabs. {lang === 'es' ? 'Todos los derechos reservados desde Chile.' : 'All rights reserved from Chile.'}</p>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-noct-neon transition text-lg">📷</a>
            <a href="#" className="hover:text-noct-neon transition text-lg">💼</a>
            <a href="#" className="hover:text-noct-neon transition text-lg">💻</a>
          </div>
        </div>
      </footer>

      {/* TERMINAL FLOTANTE */}
      <div className="fixed bottom-6 right-6 z-50 font-mono">
        {!terminalOpen && (
          <button onClick={() => setTerminalOpen(true)} className="bg-[#0a0818]/90 border border-noct-purple hover:border-noct-neon text-noct-neon px-5 py-3 rounded-full shadow-2xl transition-all text-xs flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-noct-neon animate-pulse"></span><span>noctulabs_shell.sh</span></button>
        )}
        {terminalOpen && (
          <div className="w-80 sm:w-96 bg-[#060413]/95 border-2 border-noct-purple rounded-xl shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-[#0a0818] px-4 py-2 flex items-center justify-between border-b border-noct-border">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500/80"></span><span className="w-3 h-3 rounded-full bg-yellow-500/80"></span><span className="w-3 h-3 rounded-full bg-green-500/80"></span><span className="text-[10px] text-gray-400 ml-2">noctulabs_console.sh</span></div>
              <button onClick={() => setTerminalOpen(false)} className="text-gray-400 hover:text-noct-neon text-xs font-bold px-1">✕</button>
            </div>
            <div className="h-48 overflow-y-auto p-4 flex flex-col gap-1 text-[11px] text-gray-300 scrollbar-thin">
              {terminalLogs.map((log, i) => (
                <div key={i} className={`whitespace-pre-wrap leading-tight ${log.startsWith('>') ? 'text-noct-neon' : log.includes('🦉') ? 'text-noct-neon font-bold' : ''}`}>{log}</div>
              ))}
            </div>
            <form onSubmit={handleTerminalSubmit} className="border-t border-noct-border bg-[#03020a] p-3 flex items-center gap-2">
              <span className="text-noct-neon font-bold text-xs">$</span>
              <input type="text" value={terminalInput} onChange={(e) => setTerminalInput(e.target.value)} placeholder={lang === 'es' ? "Escribe 'help'..." : "Type 'help'..."} className="flex-grow bg-transparent text-noct-neon focus:outline-none text-xs" autoFocus />
              <button type="submit" className="text-[10px] bg-noct-purple hover:bg-purple-600 px-2.5 py-1 rounded text-white font-bold">Run</button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;