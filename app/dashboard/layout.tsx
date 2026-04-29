"use client";
import { BookOpen, BarChart2, Settings, LogOut, Bell, ChevronDown, Search, Bookmark } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh(); // Crucial to clear server-side state
    };

    return (
        <div className="flex h-screen w-full bg-black text-white overflow-hidden">
            {/* THE SIDEBAR */}
            <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-zinc-950/80 backdrop-blur-xl hidden md:flex flex-col justify-between z-20">
                <div>
                    <div className="h-16 flex items-center px-6 border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-red-500/10 rounded-lg border border-red-500/20">
                                <BookOpen className="size-4 text-red-500" />
                            </div>
                            <span className="text-sm font-bold tracking-tight text-white">Talismati.</span>
                        </div>
                    </div>
                    <nav className="p-4 space-y-1.5">
                        <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-2 mb-3 mt-2">Platform</div>

                        <Link href="/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${pathname === '/dashboard' ? 'bg-white/5 text-white border border-white/5 shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                            <BookOpen className={`size-4 transition-colors ${pathname === '/dashboard' ? 'text-zinc-400' : 'group-hover:text-zinc-300'}`} />
                            <span className="text-sm font-medium">Active Library</span>
                        </Link>
                        <Link href="/dashboard/collection" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${pathname === '/dashboard/collection' ? 'bg-white/5 text-white border border-white/5 shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                            <Bookmark className={`size-4 transition-colors ${pathname === '/dashboard/collection' ? 'text-zinc-400' : 'group-hover:text-zinc-300'}`} />
                            <span className="text-sm font-medium">My Collection</span>
                        </Link>
                        <Link href="/dashboard/stats" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${pathname === '/dashboard/stats' ? 'bg-white/5 text-white border border-white/5 shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                            <BarChart2 className={`size-4 transition-colors ${pathname === '/dashboard/stats' ? 'text-zinc-400' : 'group-hover:text-zinc-300'}`} />
                            <span className="text-sm font-medium">Analytics</span>
                        </Link>
                    </nav>
                </div>
                <div className="p-4 border-t border-white/5 space-y-1.5">
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all group">
                        <Settings className="size-4 group-hover:text-zinc-300 transition-colors" />
                        <span className="text-sm font-medium">Settings</span>
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all group">
                        <LogOut className="size-4 group-hover:text-red-400 transition-colors" />
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* THE MAIN STAGE */}
            <div className="flex-1 flex flex-col min-w-0 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

                {/* TOP HEADER WITH SEARCH */}
                <header className="h-16 flex-shrink-0 border-b border-white/5 bg-black/50 backdrop-blur-md flex items-center justify-between px-6 relative z-10">
                    <div className="flex items-center gap-6 flex-1">
                        <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-500 font-medium whitespace-nowrap">
                            <span>Dashboard</span>
                            <span className="text-zinc-700">/</span>
                            <span className="text-white">
                                {pathname === '/dashboard/stats' ? 'Analytics' : pathname === '/dashboard/collection' ? 'Collection' : 'Library'}
                            </span>
                        </div>
                        {/* Search Bar */}
                        <div className="relative group max-w-md w-full hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-focus-within:text-red-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search books, authors, or chunks..."
                                className="w-full bg-zinc-900/50 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-red-500/50 focus:bg-zinc-900 transition-all placeholder:text-zinc-600 shadow-inner"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-full">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Daily Target:</span>
                            <span className="text-xs font-bold text-red-400">15 Min</span>
                        </div>
                        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                            <Bell className="size-4" />
                            <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-black"></span>
                        </button>
                        <div className="h-4 w-px bg-white/10 mx-1"></div>
                        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="size-7 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-500 border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                                S
                            </div>
                            <ChevronDown className="size-3 text-zinc-500" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto relative z-10 p-6 md:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
