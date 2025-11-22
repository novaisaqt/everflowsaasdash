import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-br from-black to-slate-900">
      <h1 className="text-5xl font-bold mb-6">Everflow AI Dashboard</h1>
      <p className="max-w-xl text-lg text-gray-300 mb-10">
        AI-powered ops center for recruitment, leads & automation.
      </p>

      <SignedOut>
        <SignInButton>
          <button className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <a href="/dashboard" className="px-8 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition">
          Go To Dashboard
        </a>
      </SignedIn>
    </main>
  )
}
