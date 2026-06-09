export default function ContactForm({ t }) {
    return (
        <section id="contacto" className="relative z-10 px-6 py-20 max-w-5xl mx-auto border-t border-noct-border">
            <div className="bg-[#0a0818] border border-noct-border rounded-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-hidden">
                <div className="flex flex-col justify-center h-full">
                    <h3 className="font-display text-4xl sm:text-5xl font-bold uppercase mb-4 leading-[1.1]">
                        {t.contact.title} <span className="text-noct-neon">{t.contact.title2}</span> <br /> {t.contact.title3}
                    </h3>
                    <p className="text-gray-400 text-sm max-w-xs leading-relaxed">{t.contact.sub}</p>
                </div>
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder={t.contact.name} className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon transition-colors" />
                    <input type="email" placeholder={t.contact.email} className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon transition-colors" />
                    <input type="text" placeholder={t.contact.company} className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon transition-colors" />
                    <textarea placeholder={t.contact.msg} rows="4" className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon transition-colors" required></textarea>
                    <button type="submit" className="bg-noct-purple hover:bg-purple-600 px-6 py-3 rounded font-bold transition-all glow-purple text-sm uppercase w-full flex justify-between items-center">
                        <span>{t.contact.btn}</span><span>↗</span>
                    </button>
                </form>
            </div>
        </section>
    );
}