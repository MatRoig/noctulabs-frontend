export default function Footer ({ lang }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 border-t border-noct-border bg-[#060413] px-4 sm:px-6 py-8 mt-10 text-xs sm:text-sm text-gray-500">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
                
                {/* Logo centrado */}
                <img 
                    src="/logo-noctulabs.png.jpeg" 
                    alt="Logo"
                    className="h-16 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all"
                />
                
                {/* Texto centrado */}
                <p className="text-center">
                    © {currentYear} Noctulabs. {lang === 'es' 
                        ? 'Todos los derechos reservados desde Chile.' 
                        : 'All rights reserved from Chile.'}
                </p>
                
            </div>
        </footer>
    );
}