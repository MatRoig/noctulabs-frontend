export default function Hero({ t }) {
    return (
        <header id="inicio" className="relative px-6 py-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
            <div className="relative z-10 max-w-xl bg-noct-bg/70 lg:bg-transparent p-6 rounded-xl backdrop-blur-md lg:backdrop-blur-none">
                <h1 className="font-display text-5xl sm:text-7xl font-bold uppercase tracking-wide leading-[0.95] mb-6">
                    {t.hero.title1} <br /> {t.hero.title2} <br />
                    {t.hero.title3} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-noct-neon italic">{t.hero.title4}</span>
                </h1>
                <p className="text-gray-400 text-lg mb-8 max-w-md leading-relaxed">{t.hero.sub}</p>
                <div className="flex flex-wrap gap-4 mb-10">
                    <a href="#calculadora" className="bg-noct-purple hover:bg-purple-600 px-6 py-3 rounded font-bold transition-all glow-purple text-sm uppercase min-w-[210px] text-center">{t.hero.btn1}</a>
                    <a href="#servicios" className="border border-noct-border hover:border-noct-neon px-6 py-3 rounded font-bold transition-all text-sm uppercase min-w-[180px] text-center">{t.hero.btn2}</a>
                </div>
                <div className="flex flex-wrap gap-6 text-xs font-semibold tracking-wide text-gray-400 items-center">
                    <span className="flex items-center gap-2 min-w-[140px] hover:text-white transition"><span className="text-orange-500 text-lg shrink-0">⚡ </span> {t.hero.badge1}</span>
                    <span className="flex items-center gap-2 min-w-[140px] hover:text-white transition"><span className="text-noct-neon text-lg shrink-0">🛡</span> {t.hero.badge2}</span>
                    <span className="flex items-center gap-2 min-w-[140px] hover:text-white transition"><span className="text-blue-400 text-lg shrink-0">📱</span> {t.hero.badge3}</span>
                </div>
            </div>
            <div className="absolute right-0 top-16 lg:top-25 bottom-0 w-full lg:w-[105%] z-0 pointer-events-none opacity-40 lg:opacity-100 overflow-hidden">
                <div className="relative w-full h-full">
                    <img src="/buho-hero.png.jpeg" alt="Búho" className="object-contain w-full h-full object-right-bottom" />
                    <div className="absolute inset-0 bg-gradient-to-r from-noct-bg via-noct-bg/50 to-transparent w-full h-full" />
                </div>
            </div>
        </header>
    );
}