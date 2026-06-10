export default function Navbar({ t, lang, setLang }) {
    return (
        /* Cambié el nav para que sea el contenedor ancho y moví el max-w a un div interno */
        <nav className="sticky top-0 z-50 w-full bg-noct-bg/90 backdrop-blur-md border-b border-noct-border">
            <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                
                {/* Grupo Izquierdo */}
                <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-300 whitespace-nowrap flex-1 justify-start">
                    <li><a href="#inicio" className="hover:text-noct-neon transition">{t.nav.start}</a></li>
                    <li><a href="#servicios" className="hover:text-noct-neon transition">{t.nav.services}</a></li>
                    <li><a href="#proyectos" className="hover:text-noct-neon transition">{t.nav.projects}</a></li>
                </ul>

                {/* Centro: Logo ampliado */}
                <div className="flex justify-center flex-shrink-0 px-4">
                    <img
                        src="/logo-noctulabs.png.jpeg"
                        alt="Noctulabs"
                        className="h-28 w-auto drop-shadow-[0_0_15px_rgba(157,78,221,0.6)] object-contain"
                    />
                </div>

                {/* Grupo Derecho */}
                <div className="hidden md:flex flex-1 justify-end items-center gap-6">
                    <ul className="flex gap-8 text-sm font-medium text-gray-300 whitespace-nowrap">
                        <li><a href="#calculadora" className="hover:text-noct-neon transition">{t.nav.calc}</a></li>
                        <li><a href="#nosotros" className="hover:text-noct-neon transition">{t.nav.team}</a></li>
                        <li><a href="#contacto" className="hover:text-noct-neon transition">{t.nav.contact}</a></li>
                    </ul>

                    <div className="flex bg-[#0a0818] border border-noct-border rounded-lg p-1 text-[10px] font-bold">
                        <button onClick={() => setLang('es')} className={`px-2 py-1 rounded ${lang === 'es' ? 'bg-noct-purple text-white' : 'text-gray-500 hover:text-white'}`}>ES</button>
                        <button onClick={() => setLang('en')} className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-noct-purple text-white' : 'text-gray-500 hover:text-white'}`}>EN</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}