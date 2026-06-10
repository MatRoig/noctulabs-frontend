import { useState } from 'react';

export default function Calculator({ t }) {
    const [projectType, setProjectType] = useState('vitrina');
    const [includePayments, setIncludePayments] = useState(false);
    const [includeAuth, setIncludeAuth] = useState(false);

    const calculateEstimate = () => {
        let baseWeeks = 2;
        if (projectType === 'ecommerce') baseWeeks = 4;
        if (projectType === 'customApp') baseWeeks = 6;
        if (includePayments) baseWeeks += 1;
        if (includeAuth) baseWeeks += 2;
        return baseWeeks;
    };

    return (
        <section id="calculadora" className="relative z-10 px-6 py-20 max-w-4xl mx-auto border-t border-noct-border text-center">
            <p className="text-noct-neon text-xs font-bold tracking-widest uppercase mb-2">{t.calc.mini}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wide mb-4 uppercase">{t.calc.title}</h2>
            <p className="text-gray-400 text-sm mb-12 max-w-lg mx-auto">{t.calc.sub}</p>
            <div className="border-2 border-noct-border rounded-2xl p-6 sm:p-10 text-left grid grid-cols-1 md:grid-cols-2 gap-8 shadow-2xl bg-[#0a0818] hover:border-noct-purple transition-colors">
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-400 mb-2">{t.calc.label1}</label>
                        <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full bg-[#060413] border border-noct-border rounded p-3 text-sm focus:border-noct-purple transition-colors">
                            <option value="vitrina">{t.calc.opt1}</option>
                            <option value="ecommerce">{t.calc.opt2}</option>
                            <option value="customApp">{t.calc.opt3}</option>
                        </select>
                    </div>
                    <div className="space-y-3">
                        <label className="block text-xs uppercase font-bold text-gray-400">{t.calc.label2}</label>
                        <label className="flex items-center gap-3 bg-[#060413]/60 p-3 rounded border border-noct-border hover:border-noct-neon transition-colors cursor-pointer">
                            <input type="checkbox" checked={includePayments} onChange={(e) => setIncludePayments(e.target.checked)} className="w-4 h-4 accent-noct-purple shrink-0" />
                            <div><p className="text-sm font-bold">{t.calc.check1}</p><p className="text-xs text-gray-500">{t.calc.check1_sub}</p></div>
                        </label>
                        <label className="flex items-center gap-3 bg-[#060413]/60 p-3 rounded border border-noct-border hover:border-noct-neon transition-colors cursor-pointer">
                            <input type="checkbox" checked={includeAuth} onChange={(e) => setIncludeAuth(e.target.checked)} className="w-4 h-4 accent-noct-purple shrink-0" />
                            <div><p className="text-sm font-bold">{t.calc.check2}</p><p className="text-xs text-gray-500">{t.calc.check2_sub}</p></div>
                        </label>
                    </div>
                </div>
                <div className="bg-[#060413] border border-noct-border rounded-xl p-6 flex flex-col justify-between text-center relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-noct-purple/10 rounded-full blur-2xl pointer-events-none" />
                    <div>
                        <span className="text-noct-neon text-xs font-mono block mb-4 uppercase">{t.calc.dev}</span>
                        <p className="text-gray-400 text-sm">{t.calc.est}</p>
                        <h4 className="text-6xl sm:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300 my-4">
                            ~ {calculateEstimate()} <span className="text-xl font-sans text-noct-neon">{t.calc.weeks}</span>
                        </h4>
                    </div>
                    <div className="space-y-4 relative z-10">
                        <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-noct-purple to-noct-neon h-full transition-all duration-500" style={{ width: `${(calculateEstimate() / 9) * 100}%` }} />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{t.calc.footer}</p>
                        <a href="#contacto" className="block bg-noct-purple hover:bg-purple-600 text-white font-bold py-3 px-4 rounded text-xs uppercase transition-all glow-purple">{t.calc.btn}</a>
                    </div>
                </div>
            </div>
        </section>
    );
}