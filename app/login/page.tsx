"use client";
import { ShaderPlane } from "@/components/ui/background-paper-shaders";
import { Flame, BookOpen, Library, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";

export default function LoginPage() {
    // Delays cut in half for a snappy, aggressive load sequence
    const cards = [
        // offset: 0 pulls it left, offset: 12 pushes it right, offset: 24 pushes it furthest right
        { icon: <Flame className="size-5 text-orange-400" />, title: "Micro-Reading", desc: "Digest books one page at a time. No burnout.", delay: 0.1, offset: "ml-0" },
        { icon: <Library className="size-5 text-zinc-300" />, title: "Stay Consistent", desc: "Build an unbreakable daily reading habit.", delay: 0.2, offset: "ml-12" },
        { icon: <BookOpen className="size-5 text-red-500" />, title: "Talismati Engine", desc: "Read smarter, not harder. Engineered for you.", delay: 0.3, offset: "ml-24" },
    ];

    const handleMouseMove = (e: React.MouseEvent) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        (currentTarget as HTMLElement).style.setProperty("--mouse-x", `${clientX - left}px`);
        (currentTarget as HTMLElement).style.setProperty("--mouse-y", `${clientY - top}px`);
    };

    return (
        <main className="relative flex w-full h-screen bg-black overflow-hidden selection:bg-red-500/30" onMouseMove={handleMouseMove} >
            {/* LAYER 1: Base Grid */}
            <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* LAYER 2: Interactive Spotlight Grid */}
            <div
                className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    WebkitMaskImage: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent)",
                    maskImage: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent)"
                }}
            />

            {/* The 3D Shader Engine - Now explicitly placed inside the layout at the bottom-most layer */}
            <div className="absolute inset-0 z-0 bg-black">
                <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
                    <ShaderPlane />
                </Canvas>
            </div>

            {/* LAYER 3: The "Seam Killer" Gradient Overlay */}
            {/* This physically blocks out the left side with pure black and fades perfectly into the 3D space on the right */}
            <div className="absolute inset-0 z-20 w-full lg:w-[60%] bg-gradient-to-r from-black via-black to-transparent pointer-events-none" />

            {/* LAYER 4: The Foreground UI */}
            <div className="relative z-30 flex h-full w-full pointer-events-none">

                {/* Left Panel: The Gatekeeper */}
                <div className="flex flex-col justify-center w-full lg:w-[40%] h-full p-8 md:p-16 pointer-events-auto">
                    <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors">
                        <ArrowLeft className="size-4" /> Back to engine
                    </Link>
                    <div className="w-full max-w-sm mx-auto">
                        <div className="flex items-center gap-2 mb-12">
                            <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                                <Flame className="size-6 text-red-500" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">Talismati.</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">Welcome back</h1>
                        <p className="text-zinc-400 text-sm mb-8">Access your library and continue your streak.</p>
                        <div className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                                <input type="email" placeholder="you@example.com" className="w-full h-12 bg-zinc-950 border border-white/10 rounded-xl px-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all shadow-inner" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex justify-between">
                                    <span>Password</span>
                                    <a href="#" className="text-zinc-600 hover:text-white transition-colors">Forgot?</a>
                                </label>
                                <input type="password" placeholder="••••••••" className="w-full h-12 bg-zinc-950 border border-white/10 rounded-xl px-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all shadow-inner" />
                            </div>

                            <button className="relative w-full h-12 mt-4 bg-white text-black font-bold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group/btn overflow-hidden pointer-events-auto">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                                <span className="relative z-10">Initialize Session</span>
                            </button>

                            <div className="relative flex items-center py-4">
                                <div className="flex-grow border-t border-white/5"></div>
                                <span className="flex-shrink-0 mx-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Or continue with</span>
                                <div className="flex-grow border-t border-white/5"></div>
                            </div>
                            {/* Tier-1 Auth Provider Grid */}
                            <div className="grid grid-cols-3 gap-3 pointer-events-auto">
                                {/* Google */}
                                <button className="w-full h-12 bg-zinc-950/50 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300 flex items-center justify-center group/icon hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                    <svg viewBox="0 0 24 24" className="size-5 group-hover/icon:scale-110 transition-transform" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                </button>

                                {/* GitHub */}
                                <button className="w-full h-12 bg-zinc-950/50 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300 flex items-center justify-center group/icon hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white">
                                    <svg viewBox="0 0 24 24" className="size-5 group-hover/icon:scale-110 transition-transform" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                                </button>
                                {/* Apple */}
                                <button className="w-full h-12 bg-zinc-950/50 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300 flex items-center justify-center group/icon hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white">
                                    <svg viewBox="0 0 24 24" className="size-5 group-hover/icon:scale-110 transition-transform" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.052 1.52-.075 2.124-.974 3.935-.974 1.812 0 2.463.974 4.026.94 1.608-.035 2.62-1.503 3.62-2.956 1.157-1.685 1.636-3.322 1.66-3.414-.035-.015-3.193-1.22-3.228-4.856-.03-3.045 2.486-4.512 2.596-4.577-1.428-2.096-3.64-2.368-4.432-2.406-1.895-.145-3.725 1.12-4.542 1.12zM15.008 3.39c.816-.99 1.365-2.365 1.215-3.73-1.185.048-2.618.79-3.456 1.764-.75.815-1.405 2.215-1.235 3.553 1.32.103 2.66-.677 3.476-1.587z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: The Floating Cards (Staggered Cascade) */}
                <div className="hidden lg:flex flex-col relative w-[60%] h-full items-start justify-center pl-[10%] xl:pl-[15%] gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 40, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ delay: card.delay, duration: 0.4, type: "spring", stiffness: 120, damping: 14 }}
                            className={`flex flex-col gap-3 p-6 rounded-3xl bg-black/50 backdrop-blur-3xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_0_1px_rgba(255,255,255,0.2)] w-80 sm:w-[22rem] pointer-events-auto cursor-default ${card.offset}`}
                            whileHover={{
                                x: -12,
                                scale: 1.03,
                                borderColor: "rgba(255,255,255,0.4)",
                                boxShadow: "0 0 60px rgba(255,255,255,0.1), inset 0 0 1px rgba(255,255,255,0.5)",
                                zIndex: 40
                            }}
                        >
                            <div className="flex items-center gap-3 mb-1">
                                {card.icon}
                                <span className="text-base font-bold text-white">{card.title}</span>
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
