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
        <section id="nosotros" className="relative z-10 px-6 py-20 max-w-6xl mx-auto border-t border-noct-border text-center">
            <p className="text-noct-neon text-xs font-bold tracking-widest uppercase mb-2">{t.about.mini}</p>
            <h2 className="font-display text-3xl font-bold mb-6">{t.about.title}</h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-4xl mx-auto mb-16">
                {t.about.p1} <strong className="text-white font-bold">Generation Chile</strong>, {t.about.p2} <strong className="text-white font-bold">"My favorite Rug"</strong>, {t.about.p3} <strong className="text-noct-neon
     font-bold">Noctulabs - Digital Solution</strong>, {t.about.p4}
            </p>
            <h3 className="font-display text-xl font-bold tracking-wider text-white uppercase mb-8">{t.about.teamTitle}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-left">
                {teamMembers.map((member, i) => (
                    <a key={i} href={member.linkedin} target="_blank" rel="noopener noreferrer" className="group bg-[#0a0818] border border-noct-border hover:border-noct-purple rounded-xl p-4 transition-all hover:-translate-y-1">
                        <div className="w-full aspect-square bg-purple-950/20 border border-noct-border rounded-lg overflow-hidden mb-3 flex items-center justify-center relative">
                            <img src={member.img} alt={member.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} />
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm uppercase text-white truncate group-hover:text-noct-neon">{member.name}</h4>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">{member.role}</p>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-noct-border/40 min-w-0">
                            <span className="text-[10px] font-bold text-noct-purple uppercase group-hover:text-white truncate">{t.about.connect}</span>
                            <span className="text-xs text-gray-600 group-hover:text-noct-purple shrink-0 ml-1">↗</span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}