import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import SignInForm from "./SignInForm";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-50">
        <header className="border-b border-zinc-800/80 px-4 py-4 sm:px-6">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <span className="text-sm font-medium text-zinc-400">
              Tailsmati Micro-Reader
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700 hover:text-white"
              >
                Sign Out
              </button>
            </form>
          </div>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/60 p-8 shadow-2xl shadow-black/40 backdrop-blur">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              Welcome to Tailsmati Micro-Reader
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              You’re signed in and ready to capture the small but important
              things you read.
            </p>
            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Signed in as
              </p>
              <p className="mt-1 font-medium text-zinc-100">
                {data.user.email ?? "No email"}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return <SignInForm />;
}
