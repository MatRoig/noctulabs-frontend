import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function ContactForm({ t }) {
    const titleText = t.contact.title2.split("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        social: "",
        message: ""
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSending(true);
        setSent(false);
        setError(false);

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    social: formData.social,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setSent(true);
            setFormData({ name: "", email: "", company: "", social: "", message: "" });
        } catch {
            setError(true);
        } finally {
            setSending(false);
        }
    }

    return (
        <section id="contacto" className="scroll-mt-32 relative z-10 px-4 sm:px-6 py-16 sm:py-20 max-w-5xl mx-auto border-t border-noct-border">
            <div className="bg-[#0a0818] border border-noct-border rounded-2xl p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 overflow-hidden shadow-2xl">
                
                <div className="flex flex-col justify-center h-full">
                    <h3 className="font-syne text-3xl max-sm:text-2xl sm:text-5xl font-extrabold uppercase mb-4 leading-[1.1] tracking-tighter">
                        {t.contact.title} <br />
                        <div className="flex flex-nowrap py-2">
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

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.contact.name}
                        required
                        className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon outline-none transition-all focus:ring-1 focus:ring-noct-neon"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.contact.email}
                        required
                        className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon outline-none transition-all focus:ring-1 focus:ring-noct-neon"
                    />
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t.contact.company}
                        className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon outline-none transition-all focus:ring-1 focus:ring-noct-neon"
                    />
                    <input
                        type="text"
                        name="social"
                        value={formData.social}
                        onChange={handleChange}
                        placeholder={t.contact.social}
                        className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon outline-none transition-all focus:ring-1 focus:ring-noct-neon"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.contact.msg}
                        rows="4"
                        required
                        className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon outline-none transition-all focus:ring-1 focus:ring-noct-neon resize-none"
                    />

                    {sent && (
                        <p className="text-green-400 text-sm text-center">{t.contact.sent}</p>
                    )}
                    {error && (
                        <p className="text-red-400 text-sm text-center">{t.contact.error}</p>
                    )}

                    <motion.button
                        whileHover={{ scale: sending ? 1 : 1.02 }}
                        whileTap={{ scale: sending ? 1 : 0.98 }}
                        type="submit"
                        disabled={sending}
                        className="bg-noct-purple hover:bg-purple-600 px-6 py-4 rounded font-bold transition-all text-sm uppercase w-full flex justify-between items-center shadow-[0_0_15px_rgba(123,44,191,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <span>{sending ? t.contact.sending : t.contact.btn}</span><span>↗</span>
                    </motion.button>
                </form>
            </div>
        </section>
    );
}