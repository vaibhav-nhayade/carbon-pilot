import Link from "next/link";

const processSteps = [
  {
    number: "01",
    title: "Enter",
    text: "Add your facility, energy, material, production and waste information.",
  },
  {
    number: "02",
    title: "Measure",
    text: "CarbonPilot converts operational activity into a structured carbon profile.",
  },
  {
    number: "03",
    title: "Detect",
    text: "Identify the processes and sources contributing most to your footprint.",
  },
  {
    number: "04",
    title: "Recommend",
    text: "Evaluate circular alternatives using impact, cost and feasibility.",
  },
];

const features = [
  {
    title: "Industrial Carbon Profiler",
    text: "Turn operational records into a source-wise facility carbon profile.",
    icon: "◈",
  },
  {
    title: "Emission Hotspot Detection",
    text: "Find the areas where intervention can have the greatest potential impact.",
    icon: "⌁",
  },
  {
    title: "Circular Alternatives",
    text: "Explore alternative materials, recycling loops, process changes and waste reduction.",
    icon: "↻",
  },
  {
    title: "Cost + CO₂ Intelligence",
    text: "Compare environmental potential with implementation economics.",
    icon: "₹",
  },
  {
    title: "What-if Simulation",
    text: "Test possible operational changes before making an implementation decision.",
    icon: "◇",
  },
  {
    title: "Explainable Decisions",
    text: "Understand why an intervention receives its priority.",
    icon: "?",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7faf8] text-[#10251b]">
      <nav className="sticky top-0 z-50 border-b border-[#dce7e0]/80 bg-[#f7faf8]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#176b45] text-lg font-bold text-white shadow-lg shadow-[#176b45]/20">
              C
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight">
                CarbonPilot <span className="text-[#176b45]">AI</span>
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#607067]">
                Industrial Carbon Intelligence
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-[#52645a] md:flex">
            <a href="#solution" className="transition hover:text-[#176b45]">
              Solution
            </a>
            <a href="#workflow" className="transition hover:text-[#176b45]">
              How it works
            </a>
            <a href="#features" className="transition hover:text-[#176b45]">
              Capabilities
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-[#176b45] transition hover:bg-[#eef7f1] sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-[#176b45] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#176b45]/20 transition hover:bg-[#0d4d31]"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <section className="page-grid relative">
        <div className="hero-orb -right-24 top-20 h-80 w-80 bg-[#a8dfbd]/30" />
        <div className="hero-orb -left-32 top-72 h-96 w-96 bg-[#d4efe0]/50" />

        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <div className="fade-up">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#b9d9c6] bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#176b45]">
              <span className="h-2 w-2 rounded-full bg-[#3da56d]" />
              Circular Carbon Ecosystem
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Turn industrial
              <span className="text-gradient"> emissions</span>
              into actionable decisions.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#607067]">
              CarbonPilot AI helps industries understand where their carbon
              footprint comes from, discover practical circular alternatives,
              and compare potential environmental and economic outcomes.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="rounded-2xl bg-[#176b45] px-6 py-4 text-center text-sm font-bold text-white shadow-xl shadow-[#176b45]/20 transition hover:-translate-y-0.5 hover:bg-[#0d4d31]"
              >
                Create your facility
              </Link>
              <a
                href="#solution"
                className="rounded-2xl border border-[#cddbd3] bg-white px-6 py-4 text-center text-sm font-bold text-[#176b45] transition hover:bg-[#eef7f1]"
              >
                Explore the platform
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-[#607067]">
              <span>✓ User-owned data</span>
              <span>✓ Traceable calculations</span>
              <span>✓ Explainable recommendations</span>
            </div>
          </div>

          <div className="fade-up-delay relative">
            <div className="relative rounded-[2rem] border border-[#d5e4db] bg-white p-5 shadow-2xl shadow-[#174b34]/10">
              <div className="rounded-[1.5rem] bg-[#10251b] p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9bb9a8]">
                      Decision Flow
                    </div>
                    <div className="mt-1 text-xl font-bold">
                      From data to action
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold">
                    AI-assisted
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  {[
                    ["01", "Industrial data", "Energy • Materials • Waste"],
                    ["02", "Carbon profile", "Source-wise analysis"],
                    ["03", "Hotspot", "Priority emission source"],
                    ["04", "Circular action", "Cost • CO₂ • Feasibility"],
                  ].map(([num, title, subtitle]) => (
                    <div
                      key={num}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2c9560] text-xs font-bold">
                        {num}
                      </div>
                      <div>
                        <div className="font-semibold">{title}</div>
                        <div className="mt-0.5 text-xs text-[#9bb9a8]">
                          {subtitle}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-[#176b45] p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#bce8cc]">
                    Core principle
                  </div>
                  <div className="mt-2 text-lg font-bold">
                    Measure → Identify → Decide → Act
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-[#d5e4db] bg-white p-4 shadow-xl sm:block">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#607067]">
                Designed for
              </div>
              <div className="mt-1 text-sm font-bold text-[#10251b]">
                Industrial decision-makers
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="border-y border-[#dce7e0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#176b45]">
              The problem
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
              Knowing your footprint is not enough.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#607067]">
              Industrial operations contain multiple sources of environmental
              impact. The challenge is not simply calculating a total. A
              manager needs to know which source matters most, what can be
              changed, and what the potential environmental and economic
              outcome could be.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Find the impact", "Identify the major contributors inside the facility."],
              ["02", "Evaluate the options", "Compare circular interventions against practical constraints."],
              ["03", "Take informed action", "Turn analysis into a prioritized action plan."],
            ].map(([num, title, text]) => (
              <div
                key={num}
                className="rounded-3xl border border-[#dce7e0] bg-[#f7faf8] p-7"
              >
                <div className="text-sm font-black text-[#79a88e]">{num}</div>
                <h3 className="mt-8 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-[#607067]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="page-grid">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#176b45]">
              How CarbonPilot works
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
              A decision pipeline built around your data.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#607067]">
              The platform follows a clear path from authenticated industrial
              information to analysis and action.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="h-full rounded-3xl border border-[#d5e4db] bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#79a88e]">
                      {step.number}
                    </span>
                    {index < processSteps.length - 1 && (
                      <span className="hidden text-[#9bb9a8] md:block">→</span>
                    )}
                  </div>
                  <h3 className="mt-10 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#607067]">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-[#10251b] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#8dd5aa]">
              Platform capabilities
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
              One platform from carbon diagnosis to circular action.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 transition hover:-translate-y-1 hover:bg-white/[0.08]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#176b45] text-lg font-bold">
                  {feature.icon}
                </div>
                <h3 className="mt-7 text-lg font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#a9c1b4]">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef7f1]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#176b45]">
            Start with your facility
          </div>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Your data. Your facility. Your decisions.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#607067]">
            Create an account, add your industrial facility and build your
            carbon profile from authenticated operational information.
          </p>
          <Link
            href="/register"
            className="mt-9 inline-flex rounded-2xl bg-[#176b45] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#176b45]/20 transition hover:bg-[#0d4d31]"
          >
            Create your CarbonPilot account
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#dce7e0] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-[#607067] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <span className="font-bold text-[#10251b]">CarbonPilot AI</span>{" "}
            · Industrial Carbon Intelligence
          </div>
          <div>HackOut’26 · Circular Carbon Ecosystem</div>
        </div>
      </footer>
    </main>
  );
}