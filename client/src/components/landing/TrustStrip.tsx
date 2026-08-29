export default function TrustStrip() {
  return (
    <section className="bg-white py-10 border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
          Trusted by universities in the UAE, Malaysia, India and Singapore
        </p>
        
        {/* Logos container with horizontal scroll on mobile */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 items-center justify-start md:justify-center gap-12 md:gap-20 opacity-60 grayscale-[100%] hover:grayscale-0 transition-all duration-500 hide-scrollbar">
          {/* Logo Placeholders using simple shapes/text for demonstration */}
          <div className="flex-shrink-0 flex items-center gap-2 font-serif text-xl font-bold text-slate-800">
            <div className="w-8 h-8 bg-slate-800 rounded-sm"></div>
            GlobalTech Univ
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 font-serif text-xl font-bold text-slate-800">
            <div className="w-8 h-8 rounded-full border-4 border-slate-800"></div>
            Malaysia Institute
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 font-sans text-xl font-black text-slate-800 tracking-tighter">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-b-[24px] border-b-slate-800 border-r-[16px] border-r-transparent"></div>
            INDIA EXCEL
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 font-serif text-xl font-bold text-slate-800 italic">
            <div className="w-8 h-8 bg-slate-800 rounded-br-2xl rounded-tl-2xl"></div>
            UAE Academy
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 font-sans text-xl font-bold text-slate-800 uppercase">
            <div className="w-8 h-8 grid grid-cols-2 gap-1"><div className="bg-slate-800"/><div className="bg-slate-800"/><div className="bg-slate-800"/><div className="bg-slate-800"/></div>
            SGP College
          </div>
        </div>
      </div>
    </section>
  );
}
