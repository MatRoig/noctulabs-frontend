import { motion } from "framer-motion";

export default function ContactForm({ t }) {
    // Dividimos el título en letras para animar cada una individualmente
    const titleText = t.contact.title2.split("");

    return (
        // scroll-mt-32 asegura la alineación correcta al navegar desde el Navbar
        <section id="contacto" className="scroll-mt-32 relative z-10 px-6 py-20 max-w-5xl mx-auto border-t border-noct-border">
            <div className="bg-[#0a0818] border border-noct-border rounded-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-hidden shadow-2xl">
                
                <div className="flex flex-col justify-center h-full">
                    <h3 className="font-syne text-4xl sm:text-5xl font-bold uppercase mb-4 leading-[1.1]">
                        {t.contact.title} <br />
                        {/* Animación de letras con movimiento constante */}
                        <div className="flex flex-wrap overflow-hidden py-2">
                            {titleText.map((letter, i) => (
                                <motion.span
                                    key={i}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                        ease: "easeInOut"
                                    }}
                                    className="text-noct-neon inline-block"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                        {t.contact.title3}
                    </h3>
                    <p className="text-gray-400 text-sm max-w-xs leading-relaxed">{t.contact.sub}</p>
                </div>

                <form className="flex flex-col gap-4">
                    <input type="text" placeholder={t.contact.name} required className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon outline-none transition-all focus:ring-1 focus:ring-noct-neon" />
                    <input type="email" placeholder={t.contact.email} required className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon outline-none transition-all focus:ring-1 focus:ring-noct-neon" />
                    <input type="text" placeholder={t.contact.company} className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon outline-none transition-all focus:ring-1 focus:ring-noct-neon" />
                    <textarea placeholder={t.contact.msg} rows="4" required className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon outline-none transition-all focus:ring-1 focus:ring-noct-neon resize-none"></textarea>
                    
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="bg-noct-purple hover:bg-purple-600 px-6 py-4 rounded font-bold transition-all text-sm uppercase w-full flex justify-between items-center shadow-[0_0_15px_rgba(123,44,191,0.3)]"
                    >
                        <span>{t.contact.btn}</span><span>↗</span>
                    </motion.button>
                </form>
            </div>
        </section>
    );
}