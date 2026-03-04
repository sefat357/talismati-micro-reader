import Link from "next/link";
import { ArrowRight, Upload, Clock, BookOpenCheck } from "lucide-react";

export function BottomFunnel() {
    return (
        <div className="w-full flex flex-col items-center">
            {/* The Manifesto / Pain Point */}
            <section className="w-full max-w-4xl mx-auto px-6 py-32 text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-8 leading-tight">
                    Buying books is a dopamine hit. <br className="hidden md:block" />
                    <span className="text-zinc-500">Finishing them is a discipline.</span>
                </h2>
                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    You don't lack time; you lack a system. The human brain isn't wired to tackle a 600-page wall of text after a 10-hour workday. Tailsmati engineers the discipline for you by turning overwhelming libraries into inevitable daily habits.
                </p>
            </section>

            {/* 3-Step Mechanics Timeline */}
            <section className="w-full max-w-5xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

                    {/* Step 1 */}
                    <div className="relative z-10 flex flex-col items-center text-center p-6">
                        <div className="size-16 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                            <Upload className="size-6 text-zinc-300" />
                        </div>
                        <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-2">Step 01</div>
                        <h3 className="text-xl font-bold text-white mb-3">Sync your library</h3>
                        <p className="text-sm text-zinc-400">Connect Google Drive or upload your EPUBs directly into the secure Tailsmati vault.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="relative z-10 flex flex-col items-center text-center p-6">
                        <div className="size-16 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                            <Clock className="size-6 text-zinc-300" />
                        </div>
                        <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-2">Step 02</div>
                        <h3 className="text-xl font-bold text-white mb-3">Set your constraint</h3>
                        <p className="text-sm text-zinc-400">Tell the AI you have 15 minutes. It mathematically slices the book to fit your exact schedule.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="relative z-10 flex flex-col items-center text-center p-6">
                        <div className="size-16 rounded-full bg-black border border-red-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                            <BookOpenCheck className="size-6 text-red-500" />
                        </div>
                        <div className="text-xs font-bold tracking-widest text-red-500/70 uppercase mb-2">Step 03</div>
                        <h3 className="text-xl font-bold text-white mb-3">Execute daily</h3>
                        <p className="text-sm text-zinc-400">Log in, read your generated chunk, and leave. No endless scrolling. Just pure progress.</p>
                    </div>
                </div>
            </section>

            {/* Final Massive CTA */}
            <section className="w-full py-32 px-6 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-8 relative z-10">
                    Stop skimming. <br />
                    Start finishing.
                </h2>
                <Link href="/login" className="relative z-10 flex items-center gap-2 bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                    Launch Tailsmati <ArrowRight className="size-5" />
                </Link>
            </section>

            {/* Professional Footer */}
            <footer className="w-full border-t border-white/5 bg-black pt-16 pb-8 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <span className="text-xl font-bold tracking-tight text-white mb-4 block">Tailsmati.</span>
                        <p className="text-xs text-zinc-500">The micro-reading engine engineered for high-performers.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">Changelog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li><a href="#" className="hover:text-white transition-colors">X (Twitter)</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600">
                    <p>© {new Date().getFullYear()} Tailsmati. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Designed for focus.</p>
                </div>
            </footer>
        </div>
    );
}
