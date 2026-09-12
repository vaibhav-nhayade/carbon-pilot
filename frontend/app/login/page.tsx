import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <div className="grid min-h-screen lg:grid-cols-[1fr_0.8fr]">
        <section className="hidden bg-[#10251b] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#176b45] font-bold">
              C
            </div>
            <span className="text-lg font-bold">CarbonPilot AI</span>
          </Link>

          <div className="max-w-xl">
            <div className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#8dd5aa]">
              Industrial Carbon Intelligence
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-[-0.04em]">
              Turn operational data into informed circular decisions.
            </h1>

            <p className="mt-6 max-w-lg leading-8 text-[#a9c1b4]">
              Analyze your facility, identify emission hotspots, evaluate
              circular alternatives and make decisions based on your own
              authenticated industrial data.
            </p>

            <div className="mt-10 space-y-3">
              {[
                "Source-wise carbon analysis",
                "Context-aware recommendations",
                "Cost and CO₂ impact comparison",
                "What-if scenario analysis",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-[#d4e4da]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#176b45] text-xs">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-[#718a7b]">
            HackOut’26 · Circular Carbon Ecosystem
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#176b45] font-bold text-white">
                  C
                </div>
                <span className="text-lg font-bold">CarbonPilot AI</span>
              </Link>
            </div>

            <div className="mb-8">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#176b45]">
                Welcome back
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">
                Sign in to your workspace
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#607067]">
                Access your facilities, carbon analyses and recommendations.
              </p>
            </div>

            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}