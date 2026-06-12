import { motion } from "framer-motion";

export default function Hero({ t }) {
  return (
    <header id="inicio" className="scroll-mt-32 relative px-8 py-16 md:py-24 max-w-7xl mx-auto flex items-center h-[70vh]">
        
        {/* BÚHO DE FONDO — misma capa para todos los tamaños */}
        <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 overflow-hidden lg:inset-auto lg:right-0 lg:top-0 lg:bottom-0 lg:w-[105%] z-0 pointer-events-none"
        >
            <div className="relative w-full h-full">
                {/* Gradiente izquierdo: full en móvil, 2/3 en escritorio */}
                <div className="absolute inset-y-0 left-0 w-1/3 sm:w-1/2 md:w-2/3 bg-gradient-to-r from-[#060413] via-[#060413]/90 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060413] to-transparent z-10" />
                <img 
                    src="/buho-hero.png.jpeg" 
                    alt="Búho" 
                    className="object-cover md:object-contain w-full h-full object-right-top drop-shadow-2xl opacity-100" 
                />
            </div>
        </motion.div>

        {/* TEXTO (siempre al frente) */}
        <div className="relative z-20 w-full lg:max-w-xl">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-syne text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tighter leading-[0.9] mb-6"
            >
                {t.hero.title1} <br /> {t.hero.title2} <br />
                {t.hero.title3}{" "}
                <span className="animate-gradient italic inline-block pr-4">
                    {t.hero.title4}
                </span>
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-space text-gray-400 text-sm sm:text-lg mb-8 max-w-md leading-relaxed border-l border-noct-neon pl-4"
            >
                {t.hero.sub}
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <a href="#calculadora" className="font-space bg-noct-purple hover:bg-purple-600 px-8 py-3 rounded font-bold transition-all hover:shadow-[0_0_20px_rgba(157,78,221,0.6)] text-sm uppercase inline-block">
                    {t.hero.btn1}
                </a>
            </motion.div>
        </div>
    </header>
  );
}