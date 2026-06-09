export default function Navbar({ t, lang, setLang }) {
    return (
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b
     border-noct-border sticky top-0 bg-noct-bg/90 backdrop-blur-md z-50">
            <div className="flex items-center gap-4 min-w-0">
                <img
                    src="/logo-noctulabs.png.jpeg"
                    alt="Noctulabs"
                    className="h-20 sm:h-40 w-[80px] sm:w-[160px] drop-shadow-[0_0_15px_rgba(157,78,
     221,0.6)] object-contain shrink-0"
                />
                <div className="flex bg-[#0a0818] border border-noct-border rounded-lg p-1 text-[
     10px] font-bold shrink-0">
                    <button onClick={() => setLang('es')} className={`px-2 py-1 rounded ${lang ===
                    'es' ? 'bg-noct-purple text-white' : 'text-gray-500 hover:text-white'}`}>ES</button>
                    <button onClick={() => setLang('en')} className={`px-2 py-1 rounded ${lang ===
                    'en' ? 'bg-noct-purple text-white' : 'text-gray-500 hover:text-white'}`}>EN</button>
                </div>
            </div>
            <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-300 items-center
     whitespace-nowrap">
                <li><a href="#inicio" className="hover:text-noct-neon transition">{t.nav.start}</
                    a></li>
                <li><a href="#servicios" className="hover:text-noct-neon transition">{t.nav.
                    services}</a></li>
                <li><a href="#proyectos" className="hover:text-noct-neon transition">{t.nav.
                    projects}</a></li>
                <li><a href="#calculadora" className="hover:text-noct-neon transition">{t.nav.calc}
                </a></li>
                <li><a href="#nosotros" className="hover:text-noct-neon transition">{t.nav.team}</
                    a></li>
                <li><a href="#contacto" className="hover:text-noct-neon transition">{t.nav.contact}
                </a></li>
            </ul>
            <a href="#contacto" className="bg-noct-purple hover:bg-purple-600 px-6 py-2.5
     rounded text-sm font-bold transition-all glow-purple uppercase tracking-wider text-center
     min-w-[120px] shrink-0">{t.nav.btn}</a>
        </nav>
    );
}