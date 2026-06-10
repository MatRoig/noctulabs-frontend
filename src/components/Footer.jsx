export default function Footer ({ lang }) {
    return (
        <footer className="relative z-10 border-t border-noct-border bg-[#060413] px-6 py-8 mt-10 text-sm text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <img src="/logo-noctulabs.png.jpeg" alt="Logo"
                 className="h-16 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all"/>
            <p>© 2026
                Noctulabs. {lang === 'es' ? 'Todos los derechos reservados desde Chile.' : 'All rights reserved from Chile.'}</p>
            <div className="flex gap-4 text-gray-400">
                <a href="#" className="hover:text-noct-neon transition text-lg">📷</a>
                <a href="#" className="hover:text-noct-neon transition text-lg">💼</a>
                <a href="#" className="hover:text-noct-neon transition text-lg">💻</a>
            </div>
        </div>
    </footer>
    );
}