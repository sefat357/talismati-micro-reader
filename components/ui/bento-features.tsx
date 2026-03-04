import { BrainCircuit, BookType, CloudLightning, Flame } from "lucide-react";

export function BentoFeatures() {
    return (
        <section id="features" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 mt-20">
            {/* The Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

                {/* Card 1: AI Engine (Spans 2 columns) */}
                <div className="md:col-span-2 relative rounded-3xl bg-zinc-950/50 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-white/20 transition-colors duration-500 p-8 flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                        <div className="size-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                            <BrainCircuit className="size-6 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Dynamic AI Chunking</h3>
                        <p className="text-zinc-400 max-w-md leading-relaxed">
                            Upload a 1,000-page epic. Tell Talismati you have 15 minutes a day. Our engine mathematically slices the EPUB into perfect daily chapters.
                        </p>
                    </div>
                    {/* Abstract Visual */}
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-zinc-900 rounded-full border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                        <div className="w-48 h-48 bg-zinc-800 rounded-full border border-white/5 flex items-center justify-center">
                            <div className="w-32 h-32 bg-zinc-950 rounded-full border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.2)]" />
                        </div>
                    </div>
                </div>

                {/* Card 2: Typography (1 column) */}
                <div className="md:col-span-1 relative rounded-3xl bg-zinc-950/50 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-white/20 transition-colors duration-500 p-8 flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                        <div className="size-12 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center mb-6">
                            <BookType className="size-6 text-zinc-300" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Absolute Focus</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Premium, distraction-free typography designed to reduce eye strain and keep you in the flow state.
                        </p>
                    </div>
                    {/* Abstract Visual */}
                    <div className="absolute bottom-0 right-4 text-[120px] font-serif font-bold text-white/5 leading-none group-hover:text-white/10 transition-colors duration-500">
                        Aa
                    </div>
                </div>

                {/* Card 3: Cloud Sync (1 column) */}
                <div className="md:col-span-1 relative rounded-3xl bg-zinc-950/50 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-white/20 transition-colors duration-500 p-8 flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                        <div className="size-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                            <CloudLightning className="size-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Instant Sync</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Connect your Google Drive. Your library, bookmarks, and streaks are instantly synchronized across all your devices.
                        </p>
                    </div>
                </div>

                {/* Card 4: Habit Gamification (Spans 2 columns) */}
                <div className="md:col-span-2 relative rounded-3xl bg-zinc-950/50 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-white/20 transition-colors duration-500 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="relative z-10 flex-1">
                        <div className="size-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                            <Flame className="size-6 text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Forgiving Streaks</h3>
                        <p className="text-zinc-400 max-w-sm leading-relaxed">
                            Miss a day? Talismati doesn't punish you. The algorithm recalculates your chunks automatically so you can pick right back up without overwhelming catch-up reading.
                        </p>
                    </div>
                    {/* Abstract Visual Heatmap */}
                    <div className="flex-1 w-full flex justify-end">
                        <div className="grid grid-cols-5 gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                            {[...Array(15)].map((_, i) => (
                                <div key={i} className={`size-6 rounded-sm ${i % 4 === 0 ? 'bg-zinc-800' : i % 3 === 0 ? 'bg-orange-500/50' : 'bg-orange-500'} border border-black/50`} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
