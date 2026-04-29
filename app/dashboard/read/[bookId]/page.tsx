"use client";

import { useEffect, useState, use } from "react";
import { ReactReader } from "react-reader";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ReaderPage({ params }: { params: Promise<{ bookId: string }> }) {
    const { bookId } = use(params);
    const [bookUrl, setBookUrl] = useState<string | null>(null);
    const [location, setLocation] = useState<string | number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookTitle, setBookTitle] = useState("Decrypting file from Vault...");

    useEffect(() => {
        let objectUrl: string | null = null;

        async function fetchBook() {
            try {
                // 1. Get book metadata to find drive_file_id
                const { data: book, error: dbError } = await supabase
                    .from('books')
                    .select('*')
                    .eq('id', bookId)
                    .single();

                if (dbError || !book) {
                    throw new Error("Book not found in vault.");
                }

                setBookTitle(book.title);

                // 2. Fetch the EPUB blob from our API
                const response = await fetch(`/api/drive/download?fileId=${book.drive_file_id}`);
                
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Authentication error. Please try logging in again to refresh your Google Drive token.");
                    }
                    throw new Error("Failed to fetch EPUB file from Google Drive.");
                }

                const blob = await response.blob();
                objectUrl = URL.createObjectURL(blob);
                setBookUrl(objectUrl);
                setLoading(false);

            } catch (err: any) {
                console.error(err);
                setError(err.message || "An unexpected error occurred.");
                setLoading(false);
            }
        }

        fetchBook();

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [bookId]);

    return (
        <div className="relative w-full h-screen bg-zinc-950 text-white overflow-hidden flex flex-col">
            {/* Minimalist Reader Header */}
            <header className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-black/50 backdrop-blur-md z-50 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="size-5" />
                    </Link>
                    <div className="text-sm font-medium tracking-tight text-zinc-300">
                        {bookTitle}
                    </div>
                </div>
            </header>

            {/* Reader Content */}
            <div className="flex-1 relative">
                {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-zinc-950">
                        <Loader2 className="size-8 text-zinc-500 animate-spin mb-4" />
                        <p className="text-zinc-400 text-sm animate-pulse tracking-widest uppercase">
                            Decrypting file from Vault...
                        </p>
                    </div>
                )}
                
                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-zinc-950 px-6 text-center">
                        <div className="size-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                            <span className="text-red-500 text-2xl">!</span>
                        </div>
                        <h3 className="text-xl font-medium tracking-tight text-zinc-300 mb-2">Decryption Failed</h3>
                        <p className="text-red-400/80 text-sm max-w-md">
                            {error}
                        </p>
                        <Link href="/dashboard" className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors">
                            Return to Vault
                        </Link>
                    </div>
                )}

                {bookUrl && !error && (
                    <div className="absolute inset-0 h-full w-full">
                        <ReactReader
                            url={bookUrl}
                            title={bookTitle}
                            location={location}
                            locationChanged={(loc: string) => setLocation(loc)}
                            epubInitOptions={{
                                openAs: 'epub'
                            }}
                            epubOptions={{
                                flow: 'scrolled',
                                manager: 'continuous'
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
