"use client";
import { BookDashed, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function CollectionPage() {
    const [collection, setCollection] = useState<any[]>([]); // Dynamic state, currently empty

    return (
        <div className="relative w-full min-h-screen text-white overflow-hidden flex flex-col">
            <div
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                    backgroundImage: 'radial-gradient(circle at 20% -10%, rgba(220, 38, 38, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 40%, rgba(255, 255, 255, 0.03) 0%, transparent 30%)'
                }}
            />
            <div className="w-full max-w-6xl mx-auto px-6 pt-12 md:pt-20 relative z-10 pb-32">
                <header className="mb-12 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">The Vault</h1>
                    <p className="text-zinc-500 font-light tracking-tight text-sm md:text-base">
                        Your complete library of imported EPUBs and parsed PDFs.
                    </p>
                </header>

                {/* Toolbar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12 opacity-0 animate-[fadeIn_0.8s_ease-out_0.1s_forwards]">
                    <div className="relative w-full max-w-xs xl:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                        <input
                            type="text"
                            placeholder="Search vault..."
                            className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all font-mono"
                        />
                    </div>
                    <button className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5 active:scale-95">
                        <SlidersHorizontal className="size-3" />
                        Filter
                    </button>
                </div>

                {/* Empty State */}
                {collection.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-[slideUp_0.8s_ease-out_0.2s_forwards]">
                        <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5">
                            <BookDashed className="size-8 text-zinc-700" />
                        </div>
                        <h3 className="text-xl font-medium tracking-tight text-zinc-300 mb-2">No documents found</h3>
                        <p className="text-zinc-500 font-light text-center text-sm max-w-xs">
                            Return to the dashboard to import your first file from Google Drive.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Map through real data here later */}
                    </div>
                )}
            </div>
        </div>
    );
}
