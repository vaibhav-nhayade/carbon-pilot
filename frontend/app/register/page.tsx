import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#176b45] font-bold text-white">
            C
          </div>
          <div>
            <div className="font-bold">CarbonPilot AI</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#607067]">
              Industrial Carbon Intelligence
            </div>
          </div>
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-8 lg:grid-cols-[0.7fr_1fr] lg:px-8 lg:pt-16">
        <section className="lg:sticky lg:top-10 lg:self-start">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#176b45]">
            Create your workspace
          </div>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Start with your real industrial data.
          </h1>

          <p className="mt-6 max-w-lg leading-8 text-[#607067]">
            Tell us about your organization so CarbonPilot can create the
            right workspace for your industrial analysis.
          </p>

          <div className="mt-10 space-y-4">
            {[
              ["01", "Secure account", "Your workspace is tied to an authenticated user."],
              ["02", "Business context", "Your organization profile helps contextualize the facility."],
              ["03", "Facility data", "Add actual operational information after registration."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-2xl border border-[#dce7e0] bg-white p-5"
              >
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef7f1] text-xs font-black text-[#176b45]">
                    {number}
                  </div>
                  <div>
                    <div className="font-bold">{title}</div>
                    <div className="mt-1 text-sm leading-6 text-[#607067]">
                      {text}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#dce7e0] bg-white p-6 shadow-xl shadow-[#174b34]/5 sm:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-black tracking-[-0.03em]">
              Organization registration
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#607067]">
              Required information is used to establish your CarbonPilot
              workspace.
            </p>
          </div>

          <RegisterForm />
        </section>
      </div>
    </main>
  );
}