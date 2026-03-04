import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { HeroAppMockup } from "@/components/ui/hero-app-mockup";
import { BentoFeatures } from "@/components/ui/bento-features";
import { BottomFunnel } from "@/components/ui/bottom-funnel";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-white/30">
      {/* Glassmorphic Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-white font-bold tracking-tighter text-xl">Talismati.</span>
          <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Sign In
          </Link>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-32 pb-20">

        {/* Linear-style Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-zinc-300 mb-8 hover:bg-white/10 transition-colors cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles className="size-4 text-zinc-400" />
          <span className="font-medium">The micro-reading engine is live</span>
          <ChevronRight className="size-3 text-zinc-500" />
        </div>
        {/* Apple-style Cinematic Typography */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-8 max-w-5xl bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          Finish every book. <br className="hidden sm:block" />
          One micro-habit at a time.
        </h1>
        {/* High-Contrast Subtitle */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          Talismati breaks down your EPUB library into engineered daily chunks.
          Designed for high-performers who want to read smarter, not harder.
        </p>
        {/* Premium CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <Link href="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:scale-105 transition-transform duration-300">
            Start building habits
          </Link>
          <Link href="#features" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium text-white border border-white/10 hover:bg-white/5 transition-colors">
            Explore the engine
          </Link>
        </div>
        {/* The 'Product Reveal' Stage */}
        <div className="mt-24 relative w-full max-w-5xl aspect-[16/9] rounded-2xl border border-white/10 bg-zinc-950/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_120px_rgba(255,255,255,0.05)] animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-700">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <HeroAppMockup />
        </div>
      </div>
      <BentoFeatures />
      <BottomFunnel />
    </main>
  );
}
