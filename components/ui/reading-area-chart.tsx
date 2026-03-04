"use client"
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { TrendingUp, Activity } from "lucide-react";

const generateReadingData = () => {
    const days = 28;
    let base = 15;
    return Array.from({ length: days }, (_, i) => {
        base += (Math.random() - 0.4) * 8;
        return {
            day: `Day ${i + 1}`,
            minutes: Math.max(5, Math.floor(base)),
        };
    });
};

const chartConfig = {
    minutes: {
        label: "Minutes Read",
        color: "#ef4444",
    },
} satisfies ChartConfig;

export const ReadingAreaChart = () => {
    // THE FIX: useMemo locks the data so it only generates once on mount
    const readingData = useMemo(() => generateReadingData(), []);

    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 3;
            const rotateX = ((y - centerY) / centerY) * -3;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            setIsHovered(false);
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="w-full relative bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md group hover:border-white/20 transition-all duration-700 flex flex-col shadow-2xl ease-out"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Core Plasma Glow */}
            <div className="absolute top-1/2 left-1/2 w-full h-full bg-red-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-red-500/10 transition-colors duration-1000 -translate-x-1/2 -translate-y-1/2" />

            <div className="flex flex-row items-center justify-between px-8 pt-8 pb-4 border-b border-white/5 relative z-10" style={{ transform: 'translateZ(20px)' }}>
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Activity className="size-5 text-red-500" />
                        Reading Velocity
                    </h2>
                    <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Last 28 Days</p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-transform group-hover:scale-105 duration-500">
                    <TrendingUp className="size-3.5" />
                    +14% Peak
                </div>
            </div>

            <div className="flex flex-col gap-2 p-0 mt-6 relative z-10 flex-1 justify-between" style={{ transform: 'translateZ(30px)' }}>
                <div className="flex flex-col px-8 mb-4">
                    <span className="text-6xl font-extrabold tracking-tighter text-white tabular-nums drop-shadow-lg">
                        845
                    </span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                        Total Minutes Accumulated
                    </span>
                </div>

                <div className="h-[220px] w-full mt-auto" style={{ transform: 'translateZ(40px)' }}>
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={readingData}
                                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={chartConfig.minutes.color} stopOpacity={0.6} />
                                        <stop offset="70%" stopColor={chartConfig.minutes.color} stopOpacity={0.1} />
                                        <stop offset="100%" stopColor={chartConfig.minutes.color} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
                                <XAxis hide dataKey="day" />
                                <YAxis hide domain={["dataMin - 5", "dataMax + 15"]} />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            className="bg-zinc-950 border-white/10 text-white shadow-2xl rounded-xl font-bold"
                                        />
                                    }
                                    cursor={{ stroke: "rgba(239,68,68,0.4)", strokeWidth: 2, strokeDasharray: "4 4" }}
                                />
                                <Area
                                    type="natural"
                                    dataKey="minutes"
                                    stroke={chartConfig.minutes.color}
                                    fill="url(#colorMinutes)"
                                    strokeWidth={4}
                                    activeDot={{
                                        r: 6,
                                        fill: "#ef4444",
                                        stroke: "#fff",
                                        strokeWidth: 3,
                                        className: "drop-shadow-[0_0_15px_rgba(239,68,68,1)]"
                                    }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
};
