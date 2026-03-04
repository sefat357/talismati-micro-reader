"use client";
import React, { useRef, useEffect, useState } from 'react';

export const ReadingAnalyticsCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [progress] = useState(75);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 4;
            const rotateX = ((y - centerY) / centerY) * -4;
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

    const circumference = 2 * Math.PI * 20;
    const strokeDashoffset = circumference - (circumference * progress) / 100;

    return (
        <div
            ref={cardRef}
            className="relative rounded-3xl bg-gradient-to-b from-zinc-900/80 to-black border border-white/10 p-8 overflow-hidden shadow-2xl transition-transform duration-200 ease-out group"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3 group-hover:bg-red-500/20 transition-colors duration-700" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay pointer-events-none"></div>

            <div className="flex items-start justify-between mb-8 relative z-10" style={{ transform: 'translateZ(20px)' }}>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
                        Velocity & Retention
                    </h2>
                    <p className="text-sm text-zinc-400">
                        Deep work metrics for Talismati
                    </p>
                </div>

                <div className="relative">
                    <svg width="60" height="60" className="animate-[float_3s_ease-in-out_infinite]">
                        <defs>
                            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ef4444" />
                                <stop offset="100%" stopColor="#b91c1c" />
                            </linearGradient>
                        </defs>
                        <circle cx="30" cy="30" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                        <circle
                            cx="30" cy="30" r="20" fill="none" stroke="url(#redGradient)" strokeWidth="4" strokeLinecap="round"
                            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-1000 -rotate-90 origin-center"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{progress}%</span>
                    </div>
                </div>
            </div>

            <div className="mb-6 relative z-10" style={{ transform: 'translateZ(30px)' }}>
                <div className="flex space-x-1 relative border-b border-white/10 pb-2">
                    {['overview', 'retention', 'velocity'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-bold capitalize transition-colors relative z-10 ${activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                    <div
                        className="absolute bottom-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                        style={{
                            left: activeTab === 'overview' ? '0px' : activeTab === 'retention' ? '96px' : '196px',
                            width: activeTab === 'velocity' ? '85px' : '96px'
                        }}
                    />
                </div>
            </div>

            <div className="space-y-4 relative z-10" style={{ transform: 'translateZ(40px)' }}>
                {activeTab === 'overview' && (
                    <>
                        <div className="rounded-2xl p-5 border border-white/5 bg-white/[0.02]">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Total Words Read</span>
                                <span className="text-xs font-bold px-2 py-1 rounded-md text-green-400 bg-green-500/10 border border-green-500/20">
                                    +12.5%
                                </span>
                            </div>
                            <p className="text-4xl font-extrabold text-white tracking-tight">24,780</p>
                            <div className="mt-4 h-1.5 rounded-full overflow-hidden bg-black/50 border border-white/5 shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                    style={{ width: isHovered ? '85%' : '78%' }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: 'Chunks', value: '42' },
                                { label: 'Streak', value: '4 Days' },
                                { label: 'Avg Speed', value: '250 wpm' }
                            ].map((metric) => (
                                <div key={metric.label} className="rounded-xl p-4 border border-white/5 bg-white/[0.02] text-center">
                                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-zinc-500">{metric.label}</p>
                                    <p className="text-lg font-bold text-white">{metric.value}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab !== 'overview' && (
                    <div className="h-[200px] flex items-center justify-center text-sm font-medium text-zinc-500 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                        Advanced {activeTab} data generating...
                    </div>
                )}
            </div>
        </div>
    );
};
