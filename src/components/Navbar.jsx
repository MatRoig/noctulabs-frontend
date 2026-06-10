import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ t, lang, setLang }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { href: '#inicio', label: t.nav.start },
        { href: '#servicios', label: t.nav.services },
        { href: '#proyectos', label: t.nav.projects },
        { href: '#calculadora', label: t.nav.calc },
        { href: '#nosotros', label: t.nav.about },
        { href: '#contacto', label: t.nav.contact },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-noct-bg/90 backdrop-blur-md border-b border-noct-border">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto">

                {/* Hamburguesa (móvil) */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-gray-300 hover:text-noct-neon transition p-1"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Grupo Izquierdo (escritorio) */}
                <ul className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium text-gray-300 whitespace-nowrap flex-1 justify-start">
                    <li><a href="#inicio" className="hover:text-noct-neon transition">{t.nav.start}</a></li>
                    <li><a href="#servicios" className="hover:text-noct-neon transition">{t.nav.services}</a></li>
                    <li><a href="#proyectos" className="hover:text-noct-neon transition">{t.nav.projects}</a></li>
                </ul>

                {/* Centro: Logo */}
                <div className="flex justify-center flex-shrink-0">
                    <img
                        src="/logo-noctulabs.png.jpeg"
                        alt="Noctulabs"
                        className="h-20 sm:h-24 lg:h-28 w-auto drop-shadow-[0_0_15px_rgba(157,78,221,0.6)] object-contain"
                    />
                </div>

                {/* Grupo Derecho (escritorio) */}
                <div className="hidden md:flex flex-1 justify-end items-center gap-4 lg:gap-6">
                    <ul className="flex gap-6 lg:gap-8 text-sm font-medium text-gray-300 whitespace-nowrap">
                        <li><a href="#calculadora" className="hover:text-noct-neon transition">{t.nav.calc}</a></li>
                        <li><a href="#nosotros" className="hover:text-noct-neon transition">{t.nav.about}</a></li>
                        <li><a href="#contacto" className="hover:text-noct-neon transition">{t.nav.contact}</a></li>
                    </ul>

                    <div className="flex bg-[#0a0818] border border-noct-border rounded-lg p-1 text-[10px] font-bold shrink-0">
                        <button onClick={() => setLang('es')} className={`px-2 py-1 rounded ${lang === 'es' ? 'bg-noct-purple text-white' : 'text-gray-500 hover:text-white'}`}>ES</button>
                        <button onClick={() => setLang('en')} className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-noct-purple text-white' : 'text-gray-500 hover:text-white'}`}>EN</button>
                    </div>
                </div>
            </div>

            {/* Menú móvil desplegable */}
            {menuOpen && (
                <div className="md:hidden border-t border-noct-border bg-noct-bg/95 backdrop-blur-md">
                    <div className="flex flex-col items-center gap-4 px-6 py-6">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-sm font-medium text-gray-300 hover:text-noct-neon transition uppercase tracking-wider"
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="flex bg-[#0a0818] border border-noct-border rounded-lg p-1 text-[10px] font-bold mt-2">
                            <button onClick={() => setLang('es')} className={`px-3 py-1.5 rounded ${lang === 'es' ? 'bg-noct-purple text-white' : 'text-gray-500 hover:text-white'}`}>ES</button>
                            <button onClick={() => setLang('en')} className={`px-3 py-1.5 rounded ${lang === 'en' ? 'bg-noct-purple text-white' : 'text-gray-500 hover:text-white'}`}>EN</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}