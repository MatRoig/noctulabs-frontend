import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function ContactForm({ t }) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.send(
      'service_0k7xjbt',
      'template_wqr70fq',
      {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message
      },
      'ATFlcTAe7uju91qPd'
    )
    .then(() => {
      setSent(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    })
    .catch((err) => {
      alert('Error al enviar: ' + err.text);
    })
    .finally(() => {
      setSending(false);
    });
  };

  const titleText = t.contact.title2.split('');

  if (sent) {
    return (
      <section id="contacto" className="scroll-mt-32 relative z-10 px-6 py-20 max-w-5xl mx-auto border-t border-noct-border">
        <div className="bg-[#0a0818] border border-noct-border rounded-2xl p-8 lg:p-12 text-center shadow-2xl">
          <h3 className="font-syne text-4xl font-bold text-noct-neon mb-4">¡Mensaje enviado!</h3>
          <p className="text-gray-400">Gracias por contactarnos. Te responderemos pronto.</p>
          <button onClick={() => setSent(false)} className="mt-6 text-sm text-noct-neon hover:underline">
            Enviar otro mensaje
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="scroll-mt-32 relative z-10 px-6 py-20 max-w-5xl mx-auto border-t border-noct-border">
      <div className="bg-[#0a0818] border border-noct-border rounded-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-hidden shadow-2xl">
        <div className="flex flex-col justify-center h-full">
          <h3 className="font-syne text-4xl sm:text-5xl font-bold uppercase mb-4 leading-[1.1]">
            {t.contact.title} <br />
            <div className="flex flex-wrap overflow-hidden py-2">
              {titleText.map((letter, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut'
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.contact.msg}
            rows="4"
            required
            className="bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-neon outline-none transition-all focus:ring-1 focus:ring-noct-neon resize-none"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={sending}
            className="bg-noct-purple hover:bg-purple-600 px-6 py-4 rounded font-bold transition-all text-sm uppercase w-full flex justify-between items-center shadow-[0_0_15px_rgba(123,44,191,0.3)] disabled:opacity-50"
          >
            <span>{sending ? 'Enviando...' : t.contact.btn}</span>
            <span>↗</span>
          </motion.button>
        </form>
      </div>
    </section>
  );
}
