iimport { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0f172a]">
      <SignUp />
    </div>
  )
}
