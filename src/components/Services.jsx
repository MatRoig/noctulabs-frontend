export default function Services({ t }) {
    return (
        <section id="servicios" className="relative z-10 px-6 py-20 max-w-7xl mx-auto text-center border-t border-noct-border">
            <p className="text-noct-purple text-xs font-bold tracking-widest uppercase mb-2">{t.services.mini}</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-wide mb-12 uppercase">{t.services.title}</h2>
            <div classNam="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: '💻', title: t.services.s1, desc: t.services.s1_d },
                    { icon: '🛒', title: t.services.s2, desc: t.services.s2_d },
                    { icon: '</>', title: t.services.s3, desc: t.services.s3_d },
                    { icon: '🚀', title: t.services.s4, desc: t.services.s4_d }
                ].map((s, i) => (
                    <div key={i} className="group bg-[#0a0818] border border-noct-border hover:border-noct-purple rounded-xl p-8 transition-all hover:shadow-2xl">
                        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
                        <h3 className="font-bold text-lg mb-3 uppercase text-white">{s.title}</h3>
                        <p className="text-sm text-gray-400">{s.desc}</p>
                    </div>
                ))}
        </div>
</section>
);
}