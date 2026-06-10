import { motion } from "framer-motion";

export default function Hero({ t }) {
  return (
    <>
      {/* scroll-mt-32 asegura que el salto al "Inicio" sea preciso bajo el Navbar */}
      <header id="inicio" className="scroll-mt-32 relative px-6 py-16 md:py-24 max-w-7xl mx-auto flex flex-col lg:flex-row items-center min-h-[70vh] gap-8">
          
          {/* LADO IZQUIERDO: Texto */}
          <div className="relative z-20 w-full lg:max-w-xl">
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
              >
                  <a href="#calculadora" className="font-space bg-noct-purple hover:bg-purple-600 px-8 py-3 rounded font-bold transition-all hover:shadow-[0_0_20px_rgba(157,78,221,0.6)] text-sm uppercase inline-block">
                      {t.hero.btn1}
                  </a>
              </motion.div>
          </div>

          {/* --- VERSIÓN ESCRITORIO (LG+) --- */}
          <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block absolute right-0 top-0 bottom-0 w-[105%] z-0 pointer-events-none"
          >
              {/* Agregamos un top-10 o top-16 para desplazar toda la capa hacia abajo */}
              <div className="relative w-full h-full top-12"> 
                  <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#060413] via-[#060413]/80 to-transparent z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060413] to-transparent z-10" />
                  <img src="/buho-hero.png.jpeg" alt="Búho" className="object-contain w-full h-full object-right-bottom drop-shadow-2xl" />
              </div>
          </motion.div>
      </header>

      {/* --- VERSIÓN MÓVIL (Solo visible hasta LG) --- */}
      <div className="lg:hidden w-full px-6 pb-12 flex justify-center">
          <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
              <img 
                  src="/buho-hero.png.jpeg" 
                  alt="Búho Móvil" 
                  className="w-full h-full object-contain drop-shadow-2xl opacity-90" 
              />
          </div>
      </div>
    </>
  );
}