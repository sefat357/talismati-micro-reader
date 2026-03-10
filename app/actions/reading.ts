"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface LogSessionPayload {
    bookId: string;
    timeSpentSeconds: number;
    pagesRead: number;
    newCfiIndex: string;
}

export async function logReadingSession(payload: LogSessionPayload) {
    try {
        const supabase = await createClient();

        // 1. Verify the user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            throw new Error("Unauthorized: You must be logged in to save progress.");
        }

        // 2. Log the raw session data (The actual time spent reading)
        const { error: sessionError } = await supabase
            .from("Session_Logs")
            .insert({
                user_id: user.id,
                book_id: payload.bookId,
                time_spent_seconds: payload.timeSpentSeconds,
                pages_read: payload.pagesRead,
            });

        if (sessionError) {
            console.error("Session Log Error:", sessionError);
            throw new Error("Failed to log reading session.");
        }

        // 3. Upsert the new reading state (Where the user left off)
        const { error: stateError } = await supabase
            .from("Reading_State")
            .upsert({
                user_id: user.id,
                book_id: payload.bookId,
                current_cfi_index: payload.newCfiIndex,
                status: "ACTIVE", // You mentioned logic for 'COMPLETED' is handled later
            }, { onConflict: 'user_id, book_id' }); // Assuming a unique constraint on these two

        if (stateError) {
            console.error("Reading State Error:", stateError);
            throw new Error("Failed to update reading progress.");
        }

        // 4. Revalidate the analytics page so the Recharts graph updates instantly
        revalidatePath("/dashboard/stats");

        return { success: true, message: "Chunk locked in." };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
