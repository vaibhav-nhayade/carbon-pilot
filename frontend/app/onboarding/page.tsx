"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/api";
import { clearAuthSession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import type { User } from "@/types/auth";

export default function OnboardingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => {
        clearAuthSession();
        router.replace("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf8]">
        <div className="text-sm font-semibold text-[#607067]">
          Preparing your workspace...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16">
        <div className="w-full rounded-[2rem] border border-[#dce7e0] bg-white p-8 text-center shadow-xl shadow-[#174b34]/5 sm:p-14">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#eef7f1] text-2xl font-black text-[#176b45]">
            C
          </div>

          <div className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#176b45]">
            Workspace ready
          </div>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em]">
            Welcome{user?.full_name ? `, ${user.full_name}` : ""}.
          </h1>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#607067]">
            Your authenticated CarbonPilot workspace is ready. The next step
            is to create your industrial facility and enter its actual
            operational information.
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
            {[
              ["1", "Create facility"],
              ["2", "Enter operations"],
              ["3", "Run carbon analysis"],
            ].map(([number, title]) => (
              <div
                key={number}
                className="rounded-2xl border border-[#dce7e0] bg-[#f7faf8] p-5"
              >
                <div className="text-xs font-black text-[#176b45]">
                  STEP {number}
                </div>
                <div className="mt-2 font-bold">{title}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/facilities/new"
              className="rounded-2xl bg-[#176b45] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#176b45]/20 transition hover:bg-[#0d4d31]"
            >
              Create my facility
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-[#d5e1da] px-7 py-4 text-sm font-bold text-[#176b45] transition hover:bg-[#eef7f1]"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}