import { Target, Lightbulb } from 'lucide-react';

export default function TeamSection({ t }) {
    const teamMembers = [
        { name: 'Miussete Alfaro', role: 'Full Stack Java Developer', linkedin: 'https://www.linkedin.com/in/miu-alfaro/', img: '/team/miussete.png' },
        { name: 'Fernando Cuevas', role: 'Full Stack Java Developer', linkedin: 'https://www.linkedin.com/in/fernandocuevasmunoz/', img: '/team/fernando.png' },
        { name: 'Matias Flores', role: 'Full Stack Java Developer', linkedin: 'https://www.linkedin.com/in/matias-flores-roig/', img: '/team/matias.png' },
        { name: 'Monserrat Miranda', role: 'Full Stack Java Developer', linkedin: 'https://www.linkedin.com/in/monserrat-miranda-medina-2a0948411/', img: '/team/monserrat.png' },
        { name: 'Zuelem Chañillao', role: 'Full Stack Java Developer', linkedin: 'https://www.linkedin.com/in/zuelem-cha%C3%B1illao/', img: '/team/zuelem.png' },
        { name: 'Alonso Morales', role: 'Full Stack Java Developer', linkedin: 'https://www.linkedin.com/in/alonso-morales-l%C3%B3pez-92895627b/', img: '/team/alonso.png' },
    ];

    return (
        // scroll-mt-32 aplicado para corregir el salto del Navbar
        <section id="nosotros" className="scroll-mt-32 relative z-10 px-4 sm:px-6 py-16 sm:py-24 max-w-7xl mx-auto border-t border-noct-border">
            
            {/* =========================================
                ZONA 1: INTRODUCCIÓN (Nuestra Historia)
            ========================================= */}
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                <p className="text-noct-neon text-sm font-bold tracking-widest uppercase mb-4">{t.about.mini}</p>
                <h2 className="font-syne text-3xl max-sm:text-2xl sm:text-5xl font-extrabold mb-6 sm:mb-8 uppercase tracking-tighter">{t.about.title}</h2>
                <p className="text-gray-400 text-sm sm:text-lg leading-relaxed">
                    {t.about.p1} <strong className="text-white font-bold">Generation Chile</strong>, {t.about.p2} <strong className="text-white font-bold">"My favorite Rug"</strong>, {t.about.p3} <strong className="text-noct-neon font-bold">Noctulabs - Digital Solution</strong>, {t.about.p4}
                </p>
            </div>

            {/* =========================================
                ZONA 2: MISIÓN Y VISIÓN
            ========================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24 text-left">
                {/* Tarjeta Misión */}
                <div className="group bg-[#0a0818]/80 backdrop-blur-sm border border-noct-border hover:border-noct-purple p-8 sm:p-10 rounded-2xl transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-[0_10px_40px_rgba(157,78,221,0.15)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-noct-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-purple-950/30 rounded-xl border border-noct-purple/30 group-hover:border-noct-purple transition-colors">
                            <Target className="text-noct-purple group-hover:text-noct-neon transition-colors" size={28} />
                        </div>
                        <h3 className="font-syne text-2xl font-extrabold text-white uppercase tracking-tighter">{t.about.missionTitle}</h3>
                    </div>
                    <p className="text-gray-400 text-base leading-relaxed">
                        {t.about.missionDesc}
                    </p>
                </div>

                {/* Tarjeta Visión */}
                <div className="group bg-[#0a0818]/80 backdrop-blur-sm border border-noct-border hover:border-noct-neon p-8 sm:p-10 rounded-2xl transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-[0_10px_40px_rgba(0,240,255,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-noct-neon to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-cyan-950/30 rounded-xl border border-noct-neon/30 group-hover:border-noct-neon transition-colors">
                            <Lightbulb className="text-noct-neon group-hover:text-white transition-colors" size={28} />
                        </div>
                        <h3 className="font-syne text-2xl font-extrabold text-white uppercase tracking-tighter">{t.about.visionTitle}</h3>
                    </div>
                    <p className="text-gray-400 text-base leading-relaxed">
                        {t.about.visionDesc}
                    </p>
                </div>
            </div>

            {/* --- SEPARADOR VISUAL --- */}
            <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-noct-border to-transparent mb-20" />

            {/* =========================================
                ZONA 3: EQUIPO
            ========================================= */}
            <div className="text-center mb-12">
                <h3 className="font-syne text-2xl sm:text-3xl font-extrabold tracking-tighter text-white uppercase">{t.about.teamTitle}</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 text-left max-w-6xl mx-auto">
                {teamMembers.map((member, i) => (
                    <a key={i} href={member.linkedin} target="_blank" rel="noopener noreferrer" className="group bg-[#0a0818] border border-noct-border hover:border-noct-purple rounded-xl p-3 sm:p-4 transition-all hover:-translate-y-2 hover:shadow-[0_5px_20px_rgba(157,78,221,0.15)] flex flex-col h-full">
                        <div className="w-full aspect-square bg-purple-950/10 border border-noct-border/50 rounded-lg overflow-hidden mb-4 flex items-center justify-center relative">
                            <img src={member.img} alt={member.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105" onError={(e) => e.target.style.display='none'} />
                        </div>
                        <div className="flex-grow">
                            <h4 className="font-bold text-sm uppercase text-white truncate group-hover:text-noct-neon transition-colors">{member.name}</h4>
                            <p className="text-xs text-gray-500 mt-1 leading-tight">{member.role}</p>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-noct-border/40 min-w-0">
                            <span className="text-[10px] font-bold text-noct-purple uppercase group-hover:text-white transition-colors">{t.about.connect}</span>
                            <span className="text-xs text-noct-border group-hover:text-noct-purple shrink-0 ml-1 transition-colors">↗</span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}