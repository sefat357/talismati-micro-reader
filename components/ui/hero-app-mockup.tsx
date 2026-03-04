"use client";
import { motion } from "framer-motion";
import { BookOpen, Flame, CheckCircle2, Brain, RefreshCw, Target } from "lucide-react";

export function HeroAppMockup() {
    return (
        <div className="w-full h-full relative flex items-center justify-center">
            {/* Main 3D App Window */}
            <motion.div
                initial={{ rotateX: 20, rotateY: -10, y: 50, opacity: 0 }}
                animate={{
                    rotateX: [20, 18, 20],
                    rotateY: [-10, -8, -10],
                    y: [0, -10, 0],
                    opacity: 1
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[90%] sm:w-[80%] max-w-3xl aspect-[16/10] bg-black/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.05),inset_0_0_20px_rgba(255,255,255,0.02)] overflow-hidden flex flex-col z-10"
            >
                {/* MacOS Style Top Bar */}
                <div className="h-10 w-full border-b border-white/10 flex items-center px-4 gap-2 bg-white/[0.02]">
                    <div className="size-3 rounded-full bg-zinc-700" />
                    <div className="size-3 rounded-full bg-zinc-700" />
                    <div className="size-3 rounded-full bg-zinc-700" />
                    <div className="mx-auto flex items-center gap-2 text-xs font-medium text-zinc-500">
                        <Flame className="size-3 text-red-500" /> 7-Day Streak
                    </div>
                </div>
                {/* Mockup Content Area */}
                <div className="flex flex-1 overflow-hidden">
                    <div className="w-1/3 border-r border-white/5 p-4 flex flex-col gap-4 hidden sm:flex bg-white/[0.01]">
                        <div className="h-4 w-1/2 bg-white/10 rounded animate-pulse" />
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/10">
                            <div className="size-8 rounded bg-zinc-800" />
                            <div className="flex flex-col gap-1 flex-1">
                                <div className="h-2 w-full bg-zinc-400 rounded" />
                                <div className="h-2 w-2/3 bg-zinc-600 rounded" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg opacity-40">
                            <div className="size-8 rounded bg-zinc-800" />
                            <div className="flex flex-col gap-1 flex-1">
                                <div className="h-2 w-full bg-zinc-600 rounded" />
                                <div className="h-2 w-1/2 bg-zinc-700 rounded" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 p-6 flex flex-col items-center justify-center relative">
                        <div className="absolute top-6 right-6 flex items-center gap-2 text-xs font-mono text-zinc-400">
                            <CheckCircle2 className="size-4 text-emerald-500" /> 15/15 Pages
                        </div>
                        <div className="text-center space-y-4 w-full max-w-sm">
                            <BookOpen className="size-8 text-zinc-300 mx-auto mb-6 opacity-50" />
                            <div className="h-3 w-3/4 mx-auto bg-zinc-300 rounded mb-4" />
                            <div className="h-2 w-full bg-zinc-700 rounded" />
                            <div className="h-2 w-full bg-zinc-700 rounded" />
                            <div className="mt-8 pt-6 border-t border-white/5">
                                <div className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-white text-black text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                    Daily Target Reached
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            {/* Liquid Glass Card 1: AI Chunking (Left) */}
            <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8, type: "spring", bounce: 0.4 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="absolute -left-4 sm:-left-12 lg:-left-20 top-1/4 hidden md:flex flex-col gap-2 p-4 rounded-2xl bg-black/60 backdrop-blur-3xl border border-white/10 shadow-[0_16px_32px_rgba(0,0,0,0.8),inset_0_0_1px_rgba(255,255,255,0.2)] z-20 w-56 sm:w-64 cursor-default"
            >
                <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400">
                        <Brain className="size-4" />
                    </div>
                    <span className="text-sm font-bold text-white">Neural Chunking</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">EPUBs are automatically sliced into perfect 15-minute daily read sessions.</p>
            </motion.div>
            {/* Liquid Glass Card 2: Cloud Sync (Top Right) */}
            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.8, type: "spring", bounce: 0.4 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="absolute -right-4 sm:-right-8 lg:-right-16 top-10 hidden md:flex flex-col gap-2 p-4 rounded-2xl bg-black/60 backdrop-blur-3xl border border-white/10 shadow-[0_16px_32px_rgba(0,0,0,0.8),inset_0_0_1px_rgba(255,255,255,0.2)] z-20 w-56 sm:w-64 cursor-default"
            >
                <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
                        <RefreshCw className="size-4" />
                    </div>
                    <span className="text-sm font-bold text-white">Google Drive Sync</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">Instantly fetch your entire library. Your progress stays updated everywhere.</p>
            </motion.div>
            {/* Liquid Glass Card 3: Habit Tracking (Bottom Right) */}
            <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.8, type: "spring", bounce: 0.4 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="absolute -right-4 sm:-right-12 lg:-right-24 bottom-1/4 hidden md:flex flex-col gap-2 p-4 rounded-2xl bg-black/60 backdrop-blur-3xl border border-white/10 shadow-[0_16px_32px_rgba(0,0,0,0.8),inset_0_0_1px_rgba(255,255,255,0.2)] z-20 w-56 sm:w-64 cursor-default"
            >
                <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                        <Target className="size-4" />
                    </div>
                    <span className="text-sm font-bold text-white">Built for Consistency</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">Miss a day? The engine recalculates your chunks. No guilt, just progress.</p>
            </motion.div>
        </div>
    );
}
