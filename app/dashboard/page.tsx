import { Flame, Play, Clock, BookOpen, ChevronRight, TrendingUp, Target } from "lucide-react";

export default function DashboardLibraryPage() {
    return (
        <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div className="flex flex-col gap-1 relative z-10">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    Welcome back, Sefat.
                </h1>
                <p className="text-zinc-400 text-sm md:text-base">
                    You have a <span className="text-white font-semibold">15-minute</span> chunk waiting. Keep the streak alive.
                </p>
            </div>

            {/* BENTO BOX GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">

                {/* Left Bento: Currently Reading (Takes up 2 columns) */}
                <div className="lg:col-span-2 relative group rounded-3xl bg-zinc-900/50 border border-white/10 p-6 sm:p-8 overflow-hidden shadow-2xl backdrop-blur-md flex flex-col justify-between">

                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3 group-hover:bg-red-500/20 transition-colors duration-700" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div className="flex items-center gap-2">
                            <div className="size-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Active Chunk</h2>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 items-start relative z-10 flex-1">
                        {/* Cover Art */}
                        <div className="w-32 sm:w-40 aspect-[2/3] flex-shrink-0 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-lg border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group/cover transform group-hover:-translate-y-2 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/cover:opacity-100 transition-opacity duration-500 z-10" />
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/20 to-transparent z-20"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">James Clear</span>
                                <span className="text-lg font-serif font-bold text-zinc-300 leading-tight">Atomic<br />Habits</span>
                            </div>
                        </div>

                        {/* Info & Action */}
                        <div className="flex flex-col justify-center flex-1 w-full">
                            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mb-2">
                                Atomic Habits
                            </h3>
                            <p className="text-zinc-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                                Today's chunk covers the 1st Law of Behavior Change: Make it Obvious.
                            </p>

                            {/* Compact Progress */}
                            <div className="w-full space-y-2 mb-8">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                    <span className="text-white">Day 4 / 12</span>
                                    <span className="text-zinc-500">33%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/10 shadow-inner">
                                    <div className="h-full bg-red-500 rounded-full w-[33%] shadow-[0_0_15px_rgba(239,68,68,0.5)] relative"></div>
                                </div>
                            </div>

                            <button className="w-full sm:w-fit flex items-center justify-center gap-2 px-6 py-3 bg-white text-black text-sm font-extrabold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                                <Play className="size-4 fill-black" />
                                Start Reading
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Analytics Widgets */}
                <div className="flex flex-col gap-6">

                    {/* Top Widget: Streak */}
                    <div className="flex-1 rounded-3xl bg-zinc-900/40 border border-white/10 p-6 backdrop-blur-md flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                <Flame className="size-4 text-orange-500" />
                            </div>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Current Streak</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-white">4</span>
                            <span className="text-zinc-500 font-medium">days</span>
                        </div>

                        {/* Mini week timeline */}
                        <div className="flex items-center gap-1.5 mt-4">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className={`flex-1 h-8 rounded-md flex items-center justify-center text-[10px] font-bold ${i < 4 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-zinc-950 border border-white/5 text-zinc-600'}`}>
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Widget: Consistency */}
                    <div className="flex-1 rounded-3xl bg-zinc-900/40 border border-white/10 p-6 backdrop-blur-md flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <Target className="size-4 text-blue-400" />
                            </div>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Daily Goal</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-white">15</span>
                            <span className="text-zinc-500 font-medium">min / day</span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
                            You are in the top 12% of consistent readers this week.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
