export default function LangToggle({ lang, setLang }) {
  return (
    <div className="flex bg-[#0a0818] border border-noct-border rounded-lg p-1 text-[10px] font-bold shrink-0">
      <button
        onClick={() => setLang('es')}
        className={`px-2 py-1 rounded ${lang === 'es' ? 'bg-noct-purple text-white' : 'text-gray-500 hover:text-white'}`}
      >
        ES
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-noct-purple text-white' : 'text-gray-500 hover:text-white'}`}
      >
        EN
      </button>
    </div>
  );
}
