export default function ProofSection() {
  const testimonials = [
    { quote: "We used to spend three months gathering evidence for accreditation. Now, because the data is naturally governed during the academic term, we pull a report in three hours.", author: "Director of Quality & Accreditation", role: "University of the Middle East" },
    { quote: "Having one single record for our faculty members changed everything. Their teaching load, research, and payroll are finally in one place.", author: "Dean of Faculty", role: "Institute of Technology" },
    { quote: "The early alert system doesn't just give us a score—it tells us exactly why a student is at risk, allowing our advisors to have meaningful conversations.", author: "Head of Student Affairs", role: "Global Business School" }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Proof, not promises.
          </h2>
        </div>

        {/* Large Outcome Metric */}
        <div className="max-w-4xl mx-auto bg-indigo-950 rounded-3xl p-8 md:p-12 shadow-2xl mb-16 text-center border border-indigo-800 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600 rounded-full blur-[80px] opacity-50"></div>
          
          <div className="relative z-10">
            <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-lime-300 to-emerald-500 tracking-tighter mb-4">
              90%
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Reduction in pre-audit evidence assembly.</h3>
            <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
              Because Acad Core weaves compliance into daily academic operations, universities are always audit-ready by design.
            </p>
          </div>
        </div>

        {/* Testimonials Stack */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-20">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="text-4xl text-indigo-200 font-serif absolute top-4 left-4 opacity-50">"</div>
              <p className="text-slate-700 italic relative z-10 mb-6 text-sm leading-relaxed">
                {t.quote}
              </p>
              <div>
                <div className="font-bold text-slate-900 text-sm">{t.author}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust & Security Band */}
        <div className="max-w-4xl mx-auto border-t border-slate-200 pt-12">
          <div className="text-center mb-8">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Enterprise Security & Compliance</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <TrustBadge text="ISO 27001 Certified" />
            <TrustBadge text="ISO 27701 Certified" />
            <TrustBadge text="GDPR Compliant" />
            <TrustBadge text="Regional Data Residency" />
            <TrustBadge text="End-to-End Encryption" />
          </div>
        </div>

      </div>
    </section>
  );
}

function TrustBadge({ text }: { text: string }) {
  return (
    <div className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700 shadow-sm flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
      {text}
    </div>
  );
}
