import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="py-24 bg-indigo-950 text-white relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-700/40 via-indigo-950 to-indigo-950 opacity-80"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Tell us how your institution works today, <br className="hidden md:block"/>
          <span className="text-lime-400">and where it breaks.</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-indigo-200 mb-12 font-light">
          We stay until complexity becomes capability.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="/login" 
            className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-full bg-lime-400 text-indigo-950 font-bold text-lg hover:bg-lime-300 transition-colors shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]"
          >
            Book a Tailored Proof Session
          </Link>
          <Link 
            href="#operating-model" 
            className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-full bg-transparent border border-indigo-500/50 text-white font-medium text-lg hover:bg-indigo-900/50 transition-colors"
          >
            See the operating model
          </Link>
        </div>

      </div>
    </section>
  );
}
