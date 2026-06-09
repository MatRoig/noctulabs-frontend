export default function Projects({ t, lang }) {
    return (
        <section id="proyectos" className="relative z-10 px-6 py-20 max-w-7xl mx-auto border-t border-noct-border text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wide mb-12 uppercase">{t.projects.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                <div className="group bg-[#0a0818] border border-noct-border hover:border-orange-500 rounded-xl overflow-hidden transition-all">
                    <div className="bg-orange-900/20 h-48 flex items-center justify-center border-b border-noct-border p-6">
                        <h4 className="font-display text-3xl font-bold text-orange-200 uppercase text-center leading-none transition-transform group-hover:scale-105">Café <br/>del Valle</h4>
                    </div>
                    <div className="p-5 flex justify-between items-center bg-[#0a0818]">
                        <div>
                            <h4 className="font-bold text-sm uppercase">Café del Valle</h4>
                            <p className="text-xs text-gray-500">{lang === 'es' ? 'Tienda Online' : 'Online Store'}</p>
                        </div>
                        <span className="text-gray-500 group-hover:text-orange-400">↗</span>
                    </div>
                </div>
                <div className="group bg-[#0a0818] border border-noct-border hover:border-blue-500 rounded-xl overflow-hidden transition-all">
                    <div className="bg-blue-900/20 h-48 flex items-center justify-center border-b border-noct-border p-6">
                        <h4 className="font-display text-3xl font-bold text-blue-200 uppercase text-center leading-none transition-transform group-hover:scale-105">Gym <br/>Pro</h4>
                    </div>
                    <div className="p-5 flex justify-between items-center bg-[#0a0818]">
                        <div>
                            <h4 className="font-bold text-sm uppercase">Gym Pro</h4>
                            <p className="text-xs text-gray-500">{lang === 'es' ? 'Sitio Web Corporativo' : 'Corporate Website'}</p>
                        </div>
                        <span className="text-gray-500 group-hover:text-blue-400">↗</span>
                    </div>
                </div>
                <div className="group bg-[#0a0818] border border-noct-border hover:border-noct-purple rounded-xl overflow-hidden transition-all">
                    <div className="h-48 border-b border-noct-border overflow-hidden bg-purple-950/10">
                        <img src="/MFR.png" alt="MFR" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5 flex justify-between items-center bg-[#0a0818]">
                        <div>
                            <h4 className="font-bold text-sm uppercase">My Favorite Rug</h4>
                            <p className="text-xs text-gray-500">Landing Page / Tufting</p>
                        </div>
                        <span className="text-gray-500 group-hover:text-noct-purple">↗</span>
                    </div>
                </div>
            </div>
            <button className="border border-noct-border hover:border-noct-neon px-8 py-3 rounded text-sm font-bold uppercase transition-all">{t.projects.btn}</button>
        </section>
    );
}