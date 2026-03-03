"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase/client";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      console.error("Error signing in with Google", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-4 text-zinc-50">
      <main className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/60 p-8 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Tailsmati Micro-Reader
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Sign in to start capturing and revisiting the small but important
            things you read.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-zinc-50 px-5 py-3 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-80"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-zinc-900">
            G
          </span>
          {loading ? "Redirecting…" : "Sign in with Google"}
        </button>

        <p className="mt-6 text-center text-xs text-zinc-500">
          By continuing, you agree to the processing of your reading data in
          accordance with our imaginary privacy policy.
        </p>
      </main>
    </div>
  );
}
