"use client";
import { useState, useEffect } from "react";
import { Play, ChevronRight, Sparkles, BookDashed } from "lucide-react";
import ImportBookButton from "@/components/ui/ImportBookButton";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function DashboardHomePage() {
    // Dynamic state for our library
    const [activeBook, setActiveBook] = useState<any | null>(null);
    const [libraryBooks, setLibraryBooks] = useState<any[]>([]);
    
    // Auth state
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSession() {
            const { data: { session } } = await supabase.auth.getSession();
            const currentUser = session?.user || null;
            console.log("User session:", currentUser);
            setUser(currentUser);
            setLoading(false);
        }
        fetchSession();
    }, []);

    // Handler for when Google Drive returns a file
    const handleFileImport = (file: any) => {
        const newBook = {
            id: file.supabaseId, // Supabase UUID for routing
            title: file.name.replace(/\.[^/.]+$/, ""), // Strip extension
            author: "Imported Document",
            progress: 0,
            coverColor: "bg-zinc-800",
        };

        if (!activeBook) {
            setActiveBook(newBook);
        } else {
            setLibraryBooks((prev) => [...prev, newBook]);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-white">
                <div className="animate-pulse text-zinc-500 text-sm tracking-widest uppercase">Loading Vault...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen text-white overflow-hidden flex flex-col">
            {/* Performance Fix: Replaced GPU-heavy CSS blurs with native CSS radial gradients */}
            <div
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                    backgroundImage: 'radial-gradient(circle at 20% -10%, rgba(220, 38, 38, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 40%, rgba(255, 255, 255, 0.03) 0%, transparent 30%)'
                }}
            />
            <div className="w-full max-w-5xl mx-auto px-6 pt-12 md:pt-20 relative z-10">
                <header className="mb-16 flex items-center justify-between opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
                    <h2 className="text-zinc-400 text-sm md:text-base font-medium tracking-tight flex items-center gap-2">
                        <Sparkles className="size-4 text-zinc-500" />
                        Welcome back, Sefat.
                    </h2>
                    <div className="text-xs font-bold text-zinc-500 tracking-widest uppercase">
                        {activeBook ? "Phase 01 // Active" : "Phase 00 // Standby"}
                    </div>
                </header>

                {/* Header Row for Queue & Import */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-12 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]" style={{ animationDelay: '100ms' }}>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Library Vault</h3>
                    <ImportBookButton onImport={handleFileImport} />
                </div>

                {/* Conditional Rendering: Empty State vs Active Book */}
                {!activeBook ? (
                    <div className="flex flex-col items-center justify-center py-32 opacity-0 animate-[slideUp_0.8s_ease-out_forwards]" style={{ animationDelay: '200ms' }}>
                        <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5">
                            <BookDashed className="size-8 text-zinc-600" />
                        </div>
                        <h3 className="text-2xl font-medium tracking-tight text-zinc-300 mb-2">Your vault is empty</h3>
                        <p className="text-zinc-500 font-light mb-8 text-center max-w-sm">
                            Import an EPUB or PDF from your Google Drive to begin chunking your first reading session.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Hero Section */}
                        <section className="mb-24 flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start group cursor-pointer">
                            <div className="relative w-48 md:w-64 aspect-[2/3] shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                                <div className={`absolute inset-0 ${activeBook.coverColor} rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden`}>
                                    <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 to-transparent z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest rotate-[-90deg]">Drive Source</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-5/6 h-4 bg-black/50 blur-md transition-all duration-500 group-hover:w-full group-hover:bg-black/80 group-hover:blur-xl" />
                            </div>
                            <div className="flex flex-col flex-1 justify-center text-center md:text-left mt-4 md:mt-8">
                                <div className="text-zinc-400 text-sm font-semibold tracking-widest uppercase mb-3 opacity-0 animate-[slideUp_0.8s_ease-out_forwards]">
                                    In Progress • {activeBook.progress}%
                                </div>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight mb-3 opacity-0 animate-[slideUp_0.8s_ease-out_forwards]" style={{ animationDelay: '100ms' }}>
                                    {activeBook.title}
                                </h1>
                                <p className="text-lg md:text-xl text-zinc-400 font-light tracking-tight mb-10 opacity-0 animate-[slideUp_0.8s_ease-out_forwards]" style={{ animationDelay: '200ms' }}>
                                    {activeBook.author}
                                </p>
                                <div className="flex flex-col sm:flex-row items-center gap-6 opacity-0 animate-[slideUp_0.8s_ease-out_forwards]" style={{ animationDelay: '300ms' }}>
                                    <Link href={`/dashboard/read/${activeBook.id}`} className="flex h-12 md:h-14 items-center justify-center rounded-full bg-white px-8 font-semibold text-black transition-all hover:bg-zinc-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                        <span className="flex items-center gap-2 text-sm uppercase tracking-widest">
                                            <Play className="size-4 fill-black" />
                                            Start Session
                                        </span>
                                    </Link>
                                    <div className="hidden sm:flex flex-col gap-2 w-48">
                                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-white rounded-full transition-all duration-1000 ease-out" style={{ width: `${activeBook.progress}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* The Queue (Only renders if there are extra books) */}
                        {libraryBooks.length > 0 && (
                            <nav className="mt-16 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]" style={{ animationDelay: '400ms' }}>
                                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2">
                                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Up Next</h3>
                                </div>
                                <ul className="flex flex-col">
                                    {libraryBooks.map((book, idx) => (
                                        <li key={book.id} className="group flex items-center justify-between py-5 border-b border-white/5 hover:border-white/10 transition-colors cursor-pointer active:bg-white/[0.02]">
                                            <div className="flex items-baseline gap-4">
                                                <span className="text-zinc-600 font-mono text-xs group-hover:text-zinc-400 transition-colors">0{idx + 1}</span>
                                                <h4 className="text-base md:text-lg font-medium text-zinc-300 group-hover:text-white transition-colors tracking-tight">{book.title}</h4>
                                            </div>
                                            <ChevronRight className="size-4 text-zinc-600 group-hover:text-white transition-colors group-hover:translate-x-1" />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
