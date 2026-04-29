"use client";
import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import useDrivePicker from "react-google-drive-picker";
import { supabase } from "@/lib/supabase";

interface ImportBookButtonProps {
    onImport: (file: any) => void;
}

export default function ImportBookButton({ onImport }: ImportBookButtonProps) {
    const [openPicker] = useDrivePicker();
    const [isImporting, setIsImporting] = useState(false);

    const handleOpenPicker = () => {
        openPicker({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            developerKey: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY!,
            viewId: "DOCS",
            // @ts-ignore
            mimeTypes: "application/epub+zip,application/pdf",
            customScopes: ["https://www.googleapis.com/auth/drive.readonly"],
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: false,
            callbackFunction: async (data) => {
                if (data.action === "picked") {
                    setIsImporting(true);
                    const file = data.docs[0];

                    try {
                        // 1. Get the current authenticated user
                        const { data: { user } } = await supabase.auth.getUser();

                        if (!user) throw new Error("User not authenticated");

                        // 2. Insert the book into Supabase
                        const { data: newBookData, error } = await supabase
                            .from('books')
                            .upsert({
                                user_id: user.id,
                                title: file.name.replace(/\.[^/.]+$/, ""),
                                author: "Imported Document",
                                drive_file_id: file.id,
                                mime_type: file.mimeType,
                                status: 'ready'
                            }, { onConflict: 'drive_file_id' })
                            .select()
                            .single();

                        if (error) throw error;
                        console.log("🟢 Successfully saved to Supabase:", file.name);

                        // 3. Trigger the UI update
                        onImport({ ...file, supabaseId: newBookData.id });

                    } catch (error) {
                        console.error("🔴 Error saving to database:", error);
                        alert("Failed to save book to vault.");
                    } finally {
                        setIsImporting(false);
                    }
                }
            },
        });
    };

    return (
        <button
            onClick={handleOpenPicker}
            disabled={isImporting}
            className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5 disabled:opacity-50 active:scale-95"
        >
            {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {isImporting ? "Importing..." : "Import"}
        </button>
    );
}
