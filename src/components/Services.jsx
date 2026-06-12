import { useState } from "react";
import { motion } from "framer-motion";

export default function Services({ t }) {
    // Estado para saber cuál card está activa y oscurecer las demás
    const [active, setActive] = useState(null);

    // Array de servicios principales
    const services = [
        { id: 'web-sites', icon: '💻', title: t.services.s1, desc: t.services.s1_d },
        { id: 'online-stores', icon: '🛒', title: t.services.s2, desc: t.services.s2_d },
        { id: 'web-apps', icon: '🚀', title: t.services.s3, desc: t.services.s3_d },
        { id: 'landing-pages', icon: '⚡', title: t.services.s4, desc: t.services.s4_d }
    ];

    const workflowSteps = [
        { id: 'step-1', title: t.services.step1, desc: t.services.step1_d, border: 'hover:border-purple-500/50' },
        { id: 'step-2', title: t.services.step2, desc: t.services.step2_d, border: 'hover:border-noct-neon/50' },
        { id: 'step-3', title: t.services.step3, desc: t.services.step3_d, border: 'hover:border-purple-500/50' },
        { id: 'step-4', title: t.services.step4, desc: t.services.step4_d, border: 'hover:border-noct-neon/50' },
    ];

    return (
        // scroll-mt-32 corrige el salto del Navbar
        <section id="servicios" className="scroll-mt-32 relative z-10 px-4 sm:px-6 py-16 sm:py-24 max-w-7xl mx-auto border-t border-noct-border/30">
            
            {/* =========================================
                ZONA 1: SERVICIOS PRINCIPALES
            ========================================= */}
            <div className="mb-16 text-center">
                <p className="font-space text-noct-neon text-xs font-bold tracking-[0.2em] uppercase mb-4">{t.services.mini}</p>
                <h2 className="font-syne text-3xl max-sm:text-2xl sm:text-6xl font-extrabold uppercase tracking-tighter text-white">{t.services.title}</h2>
            </div>

            {/* Grid Interactivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
                {services.map((s, i) => (
                    <motion.div 
                        key={s.id}
                        onMouseEnter={() => setActive(i)}
                        onMouseLeave={() => setActive(null)}
                        animate={{ 
                            opacity: active === null || active === i ? 1 : 0.3,
                            scale: active === i ? 1.05 : 1
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="group relative bg-[#0a0818] border border-noct-border p-8 cursor-pointer overflow-hidden transition-colors duration-500 hover:border-noct-neon"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br from-noct-neon/10 to-transparent transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'}`} />
                        
                        <div className="relative z-10">
                            <div className="text-4xl mb-6">{s.icon}</div>
                            <h3 className="font-syne font-extrabold text-xl mb-4 uppercase text-white tracking-tighter">{s.title}</h3>
                            <p className="font-space text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                        </div>

                        <div className={`absolute bottom-0 left-0 h-[2px] bg-noct-neon transition-all duration-500 ${active === i ? 'w-full' : 'w-0'}`} />
                    </motion.div>
                ))}
            </div>

            {/* --- SEPARADOR VISUAL --- */}
            <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-noct-border to-transparent mb-24" />

            {/* =========================================
                ZONA 2: FLUJO DE TRABAJO
            ========================================= */}
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <h3 className="font-syne text-3xl sm:text-4xl font-extrabold tracking-tighter text-white uppercase mb-4">
                    {t.services.flowTitle}
                </h3>
                <p className="font-space text-gray-400 text-sm sm:text-base leading-relaxed">
                    {t.services.flowSub}
                </p>
            </div>

            {/* Grilla responsiva del proceso de trabajo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative max-w-6xl mx-auto">
                {workflowSteps.map((step, i) => (
                    <div key={step.id} className="relative group flex flex-col h-full">
                        
                        <div className={`bg-[#0a0818]/60 backdrop-blur-sm border border-noct-border/70 ${step.border} p-6 sm:p-8 rounded-xl flex-grow transition-all duration-500 hover:-translate-y-2 flex flex-col`}>
                            <span className="font-syne text-xs sm:text-sm lg:text-base font-extrabold text-noct-neon tracking-wider block mb-4 uppercase">
                                {step.title}
                            </span>
                            <p className="font-space text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow">
                                {step.desc}
                            </p>
                        </div>

                        {i < 3 && (
                            <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-20 text-noct-border font-space text-xl group-hover:text-noct-neon transition-colors pointer-events-none">
                                →
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}