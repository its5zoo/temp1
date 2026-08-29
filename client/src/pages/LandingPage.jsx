import React from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import TrustStrip from '../components/landing/TrustStrip';
import ProofSection from '../components/landing/ProofSection';
import RoleCards from '../components/landing/RoleCards';
import LifecycleMap from '../components/landing/LifecycleMap';
import StorySection from '../components/landing/StorySection';
import ProofModules from '../components/landing/ProofModules';
import Architecture from '../components/landing/Architecture';
import Intelligence from '../components/landing/Intelligence';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      <Header />
      <main className="flex-1 space-y-24 pb-24">
        <Hero />
        <TrustStrip />
        <ProofSection />
        <RoleCards />
        <LifecycleMap />
        <StorySection />
        <ProofModules />
        <Architecture />
        <Intelligence />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
