"use client"
import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { ShaderPlane } from "../../components/ui/background-paper-shaders"
import { MonitorPlay, Mail, Lock, LogIn, BookOpen, Flame, Library } from "lucide-react"
import DisplayCards from "@/components/ui/display-cards"
import { Noise } from "@/components/ui/noise"

export default function LoginPage() {
    const [intensity, setIntensity] = useState(1.5)
    const [speed, setSpeed] = useState(1.0)
    const [activeEffect, setActiveEffect] = useState("combined")

    const readingCards = [
        {
            icon: <Flame className="size-4 text-orange-400" />,
            title: "Micro-Reading",
            description: "Digest books one page at a time.",
            className: "[grid-area:stack] -translate-y-32 transition-all duration-500 hover:-translate-y-40 hover:scale-105 hover:z-50 animate-in fade-in slide-in-from-bottom-10",
        },
        {
            icon: <Library className="size-4 text-zinc-300" />,
            title: "Stay Consistent",
            description: "Build a daily reading habit.",
            className: "[grid-area:stack] translate-x-12 -translate-y-4 transition-all duration-500 hover:-translate-y-12 hover:scale-105 hover:z-50 animate-in fade-in slide-in-from-bottom-20 delay-200",
        },
        {
            icon: <BookOpen className="size-4 text-red-500" />,
            title: "Tailsmati Reader",
            description: "Read smarter, not harder.",
            className: "[grid-area:stack] translate-x-24 translate-y-24 border-red-900/40 transition-all duration-500 hover:translate-y-12 hover:scale-105 hover:z-50 animate-in fade-in slide-in-from-bottom-32 delay-500",
        },
    ];

    return (
        <main className="relative flex w-full h-screen bg-black overflow-hidden font-sans">
            {/* Full-Screen 3D Shader Background */}
            <div className="absolute inset-0 z-0 bg-black">
                <Canvas camera={{ position: [0, 0, 3], fov: 75 }} className="opacity-100">
                    <group scale={[15, 15, 15]}>
                        <ShaderPlane position={[0, 0, 0]} color1="#020000" color2="#ffffff" />
                    </group>
                </Canvas>
            </div>

            {/* Left 30% Glass Panel with Form */}
            <div className="relative z-20 flex flex-col justify-center w-full lg:w-[30%] h-full p-12 bg-black/90 backdrop-blur-xl border-r border-white/5 pointer-events-auto">

                {/* Lighting overlay effects inside the panel */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-r-3xl">
                    <div
                        className="absolute top-1/4 -left-1/3 w-64 h-64 bg-red-900/20 rounded-full blur-3xl animate-pulse"
                        style={{ animationDuration: `${3 / speed}s` }}
                    />
                    <div
                        className="absolute bottom-1/3 -right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse"
                        style={{ animationDuration: `${2 / speed}s`, animationDelay: "1s" }}
                    />
                </div>

                <div className="relative z-20 w-full max-w-sm mx-auto">
                    <div className="mb-10">
                        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6 text-white border border-white/10 shadow-lg">
                            <Lock size={28} className="opacity-90" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-base text-gray-400">
                            Enter your credentials to access your account.
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-1" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-1" htmlFor="password">Password</label>
                                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Forgot?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold h-12 rounded-lg hover:bg-zinc-200 transition-colors mt-4 flex items-center justify-center gap-2"
                        >
                            <LogIn size={20} />
                            Sign In to Account
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-between">
                        <span className="w-1/4 border-b border-white/10"></span>
                        <span className="text-xs font-medium text-center text-gray-500 uppercase tracking-widest px-2">or continue with</span>
                        <span className="w-1/4 border-b border-white/10"></span>
                    </div>

                    <button
                        type="button"
                        className="w-full h-12 mt-8 border border-zinc-800 bg-transparent text-white font-medium rounded-lg hover:bg-zinc-900 transition-colors flex items-center justify-center gap-3 group"
                    >
                        <MonitorPlay size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                        Sign In with Google
                    </button>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account? <a href="#" className="text-white hover:underline font-medium">Sign up</a>
                    </p>
                </div>
            </div>

            {/* Right 70% Floating Cards (Hidden on mobile, visible on desktop) */}
            <div className="relative z-10 hidden lg:flex flex-col items-center justify-center w-[70%] h-full pointer-events-none">
                {/* Re-enable pointer events just for the cards so hover effects work */}
                <div className="pointer-events-auto scale-110">
                    <DisplayCards cards={readingCards} />
                </div>
            </div>

            <Noise />
        </main>
    )
}
