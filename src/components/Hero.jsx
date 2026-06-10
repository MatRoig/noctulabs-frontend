import { motion } from "framer-motion";

export default function Hero({ t }) {
  return (
    <header id="inicio" className="relative px-6 py-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
        
        <div className="relative z-10 max-w-xl">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-syne text-5xl sm:text-7xl font-extrabold uppercase tracking-tighter leading-[0.9] mb-6"
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
                className="font-space text-gray-400 text-lg mb-8 max-w-md leading-relaxed border-l border-noct-neon pl-4"
            >
                {t.hero.sub}
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap gap-4"
            >
                <a href="#calculadora" className="font-space bg-noct-purple hover:bg-purple-600 px-8 py-3 rounded font-bold transition-all hover:shadow-[0_0_20px_rgba(157,78,221,0.6)] text-sm uppercase">
                    {t.hero.btn1}
                </a>
            </motion.div>
        </div>

        {/* Imagen con Fusión (Vignetting) */}
        <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-16 lg:top-25 bottom-0 w-full lg:w-[105%] z-0 pointer-events-none opacity-50 lg:opacity-100"
        >
            <div className="relative w-full h-full">
                
                {/* 1. Gradiente izquierdo extendido y más denso */}
                {/* He cambiado w-48 por w-2/3 y añadido un 'via' para mayor opacidad */}
                <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#060413] via-[#060413]/80 to-transparent z-10" />
                
                {/* 2. Gradiente inferior */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060413] to-transparent z-10" />
                
                <img 
                    src="/buho-hero.png.jpeg" 
                    alt="Búho" 
                    className="object-contain w-full h-full object-right-bottom drop-shadow-2xl" 
                />
            </div>
        </motion.div>
    </header>
  );
}