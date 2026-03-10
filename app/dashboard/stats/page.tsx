"use client";
import { ReadingAnalyticsCard } from "@/components/ui/analytics-dashboard";
import { ReadingAreaChart } from "@/components/ui/reading-area-chart";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StatsPage() {
    const [stats, setStats] = useState({
        totalWords: 0,
        totalMinutes: 0,
        streak: 0,
        avgWpm: 0,
        history: [] as any[]
    });

    return (
        <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col gap-8 pb-32">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                    Analytics
                </h1>
                <p className="text-zinc-400 text-sm">
                    A deep dive into your reading habits and velocity.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 relative z-10">
                {/* The 3D Component */}
                <ReadingAnalyticsCard stats={stats} />

                {/* The New Area Chart */}
                <div className="flex xl:py-8 w-full">
                    <ReadingAreaChart stats={stats} />
                </div>
            </div>

            {/* Activity Log / Reading History */}
            <section className="mt-12 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Activity Log</h3>
                </div>
                <div className="flex flex-col gap-10">
                    {stats.history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
                            <p className="text-zinc-600 text-sm tracking-widest uppercase font-bold">Waiting for first session...</p>
                        </div>
                    ) : (
                        stats.history.map((day, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-12">
                                {/* Date Column */}
                                <div className="md:w-32 shrink-0 pt-1">
                                    <span className="text-sm font-medium text-zinc-500 tracking-tight">{day.date}</span>
                                </div>
                                {/* Timeline Column */}
                                <div className="flex-1 border-l border-white/5 relative pl-6 md:pl-8 pb-2">
                                    <div className="flex flex-col gap-8">
                                        {day.sessions.map((session: any) => (
                                            <div key={session.id} className="relative group cursor-default">
                                                {/* Timeline Node */}
                                                <div className="absolute -left-[29px] md:-left-[37px] top-2 size-2 rounded-full bg-zinc-800 ring-4 ring-black group-hover:bg-white transition-colors duration-300" />

                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                    <div className="flex items-baseline gap-3">
                                                        <span className="text-xs font-mono text-zinc-500 w-16">{session.time}</span>
                                                        <h4 className="text-base font-medium text-zinc-300 group-hover:text-white transition-colors tracking-tight">
                                                            {session.book}
                                                        </h4>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs font-mono">
                                                        <span className="text-zinc-400 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                                            {session.duration}
                                                        </span>
                                                        <span className="text-zinc-300">{session.progress}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
