import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import TrustStrip from '@/components/landing/TrustStrip';
import LifecycleMap from '@/components/landing/LifecycleMap';
import ProofModules from '@/components/landing/ProofModules';
import StorySection from '@/components/landing/StorySection';
import RoleCards from '@/components/landing/RoleCards';
import Intelligence from '@/components/landing/Intelligence';
import ProofSection from '@/components/landing/ProofSection';
import Architecture from '@/components/landing/Architecture';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-lime-400 selection:text-indigo-950">
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <LifecycleMap />
        <ProofModules />
        <StorySection />
        <RoleCards />
        <Intelligence />
        <ProofSection />
        <Architecture />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
