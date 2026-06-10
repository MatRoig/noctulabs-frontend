import { useState } from "react";
import { motion } from "framer-motion";

export default function Services({ t }) {
    // Estado para saber cuál card está activa y oscurecer las demás
    const [active, setActive] = useState(null);

    const services = [
        { icon: '💻', title: t.services.s1, desc: t.services.s1_d },
        { icon: '🛒', title: t.services.s2, desc: t.services.s2_d },
        { icon: '🚀', title: t.services.s3, desc: t.services.s3_d },
        { icon: '⚡', title: t.services.s4, desc: t.services.s4_d }
    ];

    return (
        <section id="servicios" className="relative z-10 px-6 py-24 max-w-7xl mx-auto border-t border-noct-border/30">
            <div className="mb-16 text-center">
                <p className="font-space text-noct-neon text-xs font-bold tracking-[0.2em] uppercase mb-4">{t.services.mini}</p>
                <h2 className="font-syne text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">{t.services.title}</h2>
            </div>

            {/* Grid Interactivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((s, i) => (
                    <motion.div 
                        key={i}
                        onMouseEnter={() => setActive(i)}
                        onMouseLeave={() => setActive(null)}
                        // Lógica de opacidad: si hay un activo y no es este, opacidad 30%
                        animate={{ 
                            opacity: active === null || active === i ? 1 : 0.3,
                            scale: active === i ? 1.05 : 1
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="group relative bg-[#0a0818] border border-noct-border p-8 cursor-pointer overflow-hidden transition-colors duration-500 hover:border-noct-neon"
                    >
                        {/* Brillo de neón interno que solo aparece al activar */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-noct-neon/10 to-transparent transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'}`} />
                        
                        <div className="relative z-10">
                            <div className="text-4xl mb-6">{s.icon}</div>
                            <h3 className="font-syne font-bold text-xl mb-4 uppercase text-white tracking-wide">{s.title}</h3>
                            <p className="font-space text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                        </div>

                        {/* Línea de neón inferior que crece al hacer hover */}
                        <div className={`absolute bottom-0 left-0 h-[2px] bg-noct-neon transition-all duration-500 ${active === i ? 'w-full' : 'w-0'}`} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}