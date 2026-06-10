import { useState } from 'react';

const translations = {
  es: {
    nav: { start: 'Inicio', services: 'Servicios', projects: 'Proyectos', calc: 'Calculadora', about: 'Nosotros', contact: 'Contacto', btn: 'Hablemos' },
    hero: { title1: 'Creamos sitios', title2: 'web que trabajan', title3: 'mientras', title4: 'duermes', sub: 'Desarrollo web creativo, rápido y funcional para potenciar tu negocio en el mundo digital.', btn1: 'Usar Calculadora ⚡', btn2: 'Ver Qué Hacemos >', badge1: 'Entrega rápida', badge2: 'Webs seguras', badge3: '100% Responsivas' },
    services: { 
        mini: 'Servicios', 
        title: '¿QUÉ HACEMOS?', 
        s1: 'Sitios Web', 
        s1_d: 'Páginas modernas, rápidas y optimizadas para tu negocio (Webs vitrina).', 
        s2: 'Tiendas Online', 
        s2_d: 'E-commerce seguros y fáciles de administrar con pasarela de pago.', 
        s3: 'Aplicaciones Web', 
        s3_d: 'Sistemas a la medida para automatizar tus procesos en Java.', 
        s4: 'Landing Pages', 
        s4_d: 'Páginas que convierten visitantes en clientes y portafolios.',
        flowTitle: 'Nuestro Flujo de Trabajo',
        flowSub: 'Cómo transformamos la identidad de tu pyme en una solución digital única.',
        
        // --- CAMBIO AQUÍ: PASO 1 ACTUALIZADO ---
        step1: '01. Inmersión',
        step1_d: 'Coordinamos un encuentro cara a cara para aterrizar tus ideas, resolver dudas y absorber la verdadera esencia de tu pyme.',
        
        step2: '02. Estrategia',
        step2_d: 'Definimos la estructura ideal (vitrina, catálogo, landing) adaptada 100% a tus objetivos, sin usar plantillas frías.',
        step3: '03. Desarrollo',
        step3_d: 'Construimos tu sitio con código limpio, robusto, optimizado y totalmente responsivo.',
        step4: '04. Despegue',
        step4_d: 'Lanzamos tu plataforma al mundo y nos aseguramos de que empiece a trabajar mientras duermes.'
    },
    projects: { title: 'Proyectos Destacados', btn: 'Ver más proyectos >' },
    calc: { mini: 'Simulador Digital', title: 'Calcula tu Alcance en tiempo real', sub: 'Selecciona las especificaciones de tu idea y mira cómo nuestro algoritmo estima las semanas de desarrollo.', label1: '1. Tipo de Software Principal', opt1: 'Página Vitrina / Portafolio', opt2: 'E-Commerce con Catálogo Completo', opt3: 'Aplicación a Medida / Sistema Complejo', label2: '2. Módulos Adicionales Necesarios', check1: 'Integración de Pasarela de Pago', check1_sub: 'Transacciones e-commerce Webpay, Stripe o PayPal.', check2: 'Autenticación y Perfiles de Usuario', check2_sub: 'Logins de clientes seguros y Base de Datos protegida.', dev: '// Desarrollo Noctulabs', est: 'Tiempo Estimado de Entrega:', weeks: 'Semanas', footer: 'Código limpio, estructurado y optimizado.', btn: 'Cotizar este desarrollo ↗' },
    about: { 
        mini: 'Nuestra Historia', 
        title: 'NOCTULABS - DIGITAL SOLUTION', 
        p1: 'Comenzamos en', 
        p2: 'un bootcamp tech donde consolidamos nuestro desempeño trabajando en nuestra primera pyme:', 
        p3: 'dedicada a crear alfombras personalizadas con la técnica tufting. Tras ver los excelentes resultados y nuestra cohesión técnica como equipo de 6 Desarrolladores Full Stack Java, decidimos dar el paso y formalizarnos como', 
        p4: 'ofreciendo servicios web personalizados a todo América y Europa.', 
        missionTitle: 'Nuestra Misión',
        missionDesc: 'Ser el puente que conecta a las pymes con el mundo digital sin perder su esencia. Nos tomamos el tiempo de sumergirnos en la identidad de cada cliente para crear soluciones a medida —ya sea una vitrina, un portafolio o un e-commerce—. No entregamos plantillas genéricas; traducimos el alma de tu negocio al lenguaje digital para cumplir tus objetivos reales.',
        visionTitle: 'Nuestra Visión',
        visionDesc: 'Convertirnos en el aliado tecnológico definitivo para los emprendedores, demostrando que la digitalización no tiene por qué ser fría ni estandarizada. Queremos ser reconocidos por erradicar el diseño web genérico, elevando el estándar de cómo las pymes se presentan al mundo a través de un enfoque tecnológico profundamente humano y personalizado.',
        teamTitle: '// El Equipo de Ingeniería', 
        connect: 'Conectar' 
    },
    contact: { title: '¿Tienes un', title2: 'proyecto', title3: 'en mente?', sub: 'Cuéntanos tu idea y te ayudaremos a hacerla realidad. Diseñamos soluciones seguras con alta capacidad backend.', name: 'Tu nombre', email: 'Tu correo electrónico', company: 'Nombre de tu empresa (opcional)', msg: 'Cuéntanos sobre tu proyecto...', btn: 'Enviar Mensaje' },
    terminal: { welcome: 'NOCTULABS_OS v2.6.0 - INICIALIZADO CON ÉXITO', help_msg: 'Escribe "help" para ver los comandos disponibles.', help: 'Comandos disponibles:', t_desc: 'Muestra las especialidades del equipo', p_desc: 'Diagnóstico de latencia de servidores', c_desc: 'Limpiar consola', s_desc: 'Desencriptar transmisión del sistema', unknown: 'No se reconoce el comando. Escribe "help".', secret: '🦉 MENSAJE DESENCRIPTADO: "Mientras el resto del mundo duerme, nosotros construimos el futuro digital."' }
  },
  en: {
    nav: { start: 'Home', services: 'Services', projects: 'Projects', calc: 'Calculator', about: 'About Us', contact: 'Contact', btn: "Let's Talk" },
    hero: { title1: 'We create', title2: 'websites that work', title3: 'while you', title4: 'sleep', sub: 'Creative, fast, and functional web development to empower your business in the digital world.', btn1: 'Use Calculator ⚡', btn2: 'What We Do >', badge1: 'Fast delivery', badge2: 'Secure websites', badge3: '100% Responsive' },
    services: { 
        mini: 'Services', 
        title: 'WHAT WE DO', 
        s1: 'Websites', 
        s1_d: 'Modern, fast, and optimized pages for your business (Showcase sites).', 
        s2: 'Online Stores', 
        s2_d: 'Secure and easy-to-manage e-commerce with payment gateways.', 
        s3: 'Web Applications', 
        s3_d: 'Custom systems to automate your processes using Java.', 
        s4: 'Landing Pages', 
        s4_d: 'Pages that convert visitors into customers and portfolios.',
        flowTitle: 'Our Workflow',
        flowSub: 'How we transform your SME’s identity into a unique digital solution.',
        
        // --- CAMBIO AQUÍ: PASO 1 ACTUALIZADO EN INGLÉS ---
        step1: '01. Immersion',
        step1_d: 'We coordinate a face-to-face meeting to ground your ideas, clear doubts, and absorb the true essence of your business.',
        
        step2: '02. Strategy',
        step2_d: 'We define the ideal structure (showcase, catalog, landing) tailored 100% to your goals, without cold templates.',
        step3: '03. Development',
        step3_d: 'We build your site using clean, robust, optimized, and fully responsive code.',
        step4: '04. Launch',
        step4_d: 'We launch your platform to the world and make sure it starts working while you sleep.'
    },
    projects: { title: 'Featured Projects', btn: 'See more projects >' },
    calc: { mini: 'Digital Simulator', title: 'Calculate your Scope in real-time', sub: 'Select your idea specifications and watch our algorithm estimate development weeks.', label1: '1. Main Software Type', opt1: 'Showcase Page / Portfolio', opt2: 'E-Commerce with Full Catalog', opt3: 'Custom App / Complex System', label2: '2. Additional Modules Needed', check1: 'Payment Gateway Integration', check1_sub: 'E-commerce transactions via Webpay, Stripe, or PayPal.', check2: 'Auth & User Profiles', check2_sub: 'Secure customer logins and protected Database.', dev: '// Noctulabs Development', est: 'Estimated Delivery Time:', weeks: 'Weeks', footer: 'Clean, structured, and optimized code.', btn: 'Quote this project ↗' },
    about: { 
        mini: 'Our Story', 
        title: 'NOCTULABS - DIGITAL SOLUTION', 
        p1: 'We started at', 
        p2: 'a tech bootcamp where we consolidated our performance working on our first SME:', 
        p3: 'dedicated to creating custom rugs using the tufting technique. After seeing the excellent results and our cohesion as a team of 6 Full Stack Java Developers, we decided to formalize as', 
        p4: 'offering custom web services to all of America and Europe.', 
        missionTitle: 'Our Mission',
        missionDesc: 'To be the bridge that connects SMEs with the digital world without losing their essence. We take the time to immerse ourselves in each client\'s identity to create tailor-made solutions—whether it\'s a showcase site, a portfolio, or an e-commerce platform. We don\'t deliver generic templates; we translate the soul of your business into digital language to meet your real objectives.',
        visionTitle: 'Our Vision',
        visionDesc: 'To become the ultimate technological ally for entrepreneurs, proving that digitization doesn\'t have to be cold or standardized. We want to be recognized for eradicating generic web design, raising the standard of how SMEs present themselves to the world through a deeply human and personalized technological approach.',
        teamTitle: '// Engineering Team', 
        connect: 'Connect' 
    },
    contact: { title: 'Have a', title2: 'project', title3: 'in mind?', sub: 'Tell us your idea and we will help you make it a reality. We design secure solutions with high backend capacity.', name: 'Your name', email: 'Your email', company: 'Company name (optional)', msg: 'Tell us about your project...', btn: 'Send Message' },
    terminal: { welcome: 'NOCTULABS_OS v2.6.0 - INITIALIZED SUCCESSFULLY', help_msg: 'Type "help" to list available terminal commands.', help: 'Available commands:', t_desc: 'Show team specializations', p_desc: 'Server latency diagnostic', c_desc: 'Clear console', s_desc: 'Decrypt system transmission', unknown: 'Command not recognized. Type "help".', secret: '🦉 MESSAGE DECRYPTED: "While the rest of the world sleeps, we build the digital future."' }
  }
};

export default function useTranslation() {
  const [lang, setLang] = useState('es');
  const t = translations[lang];
  return { t, lang, setLang };
}