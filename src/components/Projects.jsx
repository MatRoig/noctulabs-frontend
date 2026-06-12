import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Projects({ t, lang }) {
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Tus proyectos base
  const projects = [
    { 
        id: 'my-favorite-rug',
        name: "My Favorite Rug", 
        type: "E-commerce / Tufting", 
        img: "/MFR.png", 
        link: "https://www.myfavoriterug.com/", 
        borderClass: "hover:border-purple-500",
        bgClass: "bg-purple-950/10",
        textClass: "text-purple-200",
        arrowClass: "group-hover:text-purple-400"
    },
    { 
        id: 'coming-soon-1',
        name: lang === 'es' ? 'Próximamente' : 'Coming Soon', 
        type: lang === 'es' ? 'Tienda Online' : 'Online Store', 
        borderClass: "hover:border-orange-500",
        bgClass: "bg-orange-900/20",
        textClass: "text-orange-200",
        arrowClass: "group-hover:text-orange-400"
    },
    { 
        id: 'coming-soon-2',
        name: lang === 'es' ? 'Próximamente' : 'Coming Soon', 
        type: lang === 'es' ? 'Sitio Web Corporativo' : 'Corporate Website', 
        borderClass: "hover:border-blue-500",
        bgClass: "bg-blue-900/20",
        textClass: "text-blue-200",
        arrowClass: "group-hover:text-blue-400"
    },
  ];

  return (
    // scroll-mt-32 aplicado aquí para el salto correcto al hacer clic en el Navbar
    <section id="proyectos" className="scroll-mt-32 relative z-10 px-4 sm:px-6 py-16 sm:py-20 max-w-7xl mx-auto border-t border-noct-border text-center overflow-hidden">
      <h2 className="font-syne text-2xl max-sm:text-xl sm:text-4xl font-extrabold tracking-tighter mb-8 sm:mb-12 uppercase">{t.projects.title}</h2>

      <div className="relative group px-1 md:px-14">
        
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          speed={500}
          watchOverflow={false}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          breakpoints={{ 768: { slidesPerView: 3 } }}
          className="pb-10"
        >
          {projects.map((p) => (
            <SwiperSlide key={p.id}>
              {p.link ? (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className={`group/card bg-[#0a0818] border border-noct-border ${p.borderClass} rounded-xl overflow-hidden transition-all block text-left`}>
                  <div className={`h-48 border-b border-noct-border overflow-hidden ${p.bgClass}`}>
                    <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/card:scale-105" />
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <div><h4 className="font-bold text-sm uppercase">{p.name}</h4><p className="text-xs text-gray-500">{p.type}</p></div>
                    <span className={`text-gray-500 ${p.arrowClass}`}>↗</span>
                  </div>
                </a>
              ) : (
                <div className={`group/card bg-[#0a0818] border border-noct-border ${p.borderClass} rounded-xl overflow-hidden transition-all text-left`}>
                    <div className={`${p.bgClass} h-48 flex items-center justify-center border-b border-noct-border p-6`}>
                        <h4 className={`font-syne text-2xl font-bold ${p.textClass} uppercase text-center`}>{p.name}</h4>
                    </div>
                    <div className="p-5 flex justify-between items-center bg-[#0a0818]">
                        <div><h4 className="font-bold text-sm uppercase">{p.name}</h4><p className="text-xs text-gray-500">{p.type}</p></div>
                        <span className={`text-gray-500 ${p.arrowClass}`}>↗</span>
                    </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <button 
          onClick={() => {
            if (!swiperInstance) return;
            const prev = swiperInstance.realIndex - 1;
            swiperInstance.slideToLoop(prev < 0 ? projects.length - 1 : prev, 500);
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#0a0818] border border-noct-border rounded-full flex items-center justify-center text-gray-500 hover:border-noct-purple hover:text-noct-purple transition-all shadow-xl cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button 
          onClick={() => {
            if (!swiperInstance) return;
            const next = swiperInstance.realIndex + 1;
            swiperInstance.slideToLoop(next >= projects.length ? 0 : next, 500);
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#0a0818] border border-noct-border rounded-full flex items-center justify-center text-gray-500 hover:border-noct-purple hover:text-noct-purple transition-all shadow-xl cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}