"use client";

import Link from "next/link";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { getCurrentUser } from "@/lib/auth";

export default function DashboardPage() {
  const user = getCurrentUser();

  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#176b45]">
              Workspace overview
            </div>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.035em]">
              {user?.organization_name || "Your organization"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#607067]">
              Your carbon intelligence dashboard is generated from your
              authenticated facility data.
            </p>
          </div>

          <Link
            href="/facilities/new"
            className="rounded-xl bg-[#176b45] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#176b45]/20 transition hover:bg-[#0d4d31]"
          >
            + Add facility
          </Link>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#dce7e0] bg-white p-8 shadow-sm">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#eef7f1] text-2xl font-black text-[#176b45]">
              ◈
            </div>

            <div className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#176b45]">
              No analysis data yet
            </div>

            <h2 className="mt-3 text-2xl font-black tracking-[-0.03em]">
              Your dashboard will appear here.
            </h2>

            <p className="mt-4 leading-7 text-[#607067]">
              CarbonPilot does not use pre-filled factory data. Create a
              facility and enter your actual industrial information to generate
              your carbon profile, emission hotspots and personalized
              recommendations.
            </p>

            <Link
              href="/facilities/new"
              className="mt-7 inline-flex rounded-xl border border-[#cddbd3] bg-[#f7faf8] px-5 py-3 text-sm font-bold text-[#176b45] transition hover:bg-[#eef7f1]"
            >
              Create your first facility
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Carbon Profile", "Available after operational data is entered."],
            ["Emission Hotspots", "Calculated from your facility activity."],
            ["Recommendations", "Generated from your facility-specific analysis."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-[#dce7e0] bg-white p-6"
            >
              <div className="text-sm font-bold">{title}</div>
              <p className="mt-2 text-sm leading-6 text-[#607067]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedLayout>
  );
}