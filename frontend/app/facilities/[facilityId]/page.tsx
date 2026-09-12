"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import type { Facility } from "@/types/facility";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const modules = [
  {
    href: "energy",
    title: "Energy",
    description:
      "Enter electricity, fuel and other energy-source information.",
    icon: "⚡",
  },
  {
    href: "materials",
    title: "Materials",
    description:
      "Record raw materials and material consumption.",
    icon: "◈",
  },
  {
    href: "production",
    title: "Production",
    description:
      "Add production and process activity data.",
    icon: "▦",
  },
  {
    href: "waste",
    title: "Waste",
    description:
      "Record waste streams, quantities and handling.",
    icon: "↻",
  },
];

export default function FacilityPage() {
  const params = useParams();
  const facilityId = params.facilityId as string;

  const [facility, setFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFacility() {
      try {
        const token = localStorage.getItem("carbonpilot_access_token");

        const response = await fetch(
          `${API_URL}/facilities/${facilityId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Unable to load this facility.");
        }

        setFacility(await response.json());
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load this facility.",
        );
      } finally {
        setLoading(false);
      }
    }

    if (facilityId) {
      loadFacility();
    }
  }, [facilityId]);

  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link
          href="/facilities"
          className="text-sm font-semibold text-[#176b45] hover:underline"
        >
          ← All facilities
        </Link>

        {loading ? (
          <div className="mt-8 h-56 animate-pulse rounded-[2rem] bg-white" />
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : facility ? (
          <>
            <section className="mt-7 rounded-[2rem] bg-[#10251b] p-7 text-white sm:p-9">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#8dd5aa]">
                    Industrial facility
                  </div>

                  <h1 className="mt-3 text-3xl font-black tracking-[-0.035em]">
                    {facility.name}
                  </h1>

                  <p className="mt-3 text-sm capitalize text-[#a9c1b4]">
                    {facility.industry_type?.replaceAll("_", " ")} ·{" "}
                    {facility.location}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs">
                  <div className="text-[#8da99a]">Data status</div>
                  <div className="mt-1 font-bold text-[#d9ece0]">
                    Awaiting operational data
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#176b45]">
                Operational data
              </div>

              <h2 className="mt-2 text-2xl font-black">
                Build your facility carbon profile
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#607067]">
                Complete the following data areas using your actual facility
                information. Carbon analysis will be generated after data is
                available.
              </p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {modules.map((module) => (
                <Link
                  key={module.href}
                  href={`/facilities/${facility.id}/${module.href}`}
                  className="group rounded-3xl border border-[#dce7e0] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#b9d9c6] hover:shadow-xl hover:shadow-[#174b34]/5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef7f1] text-lg text-[#176b45]">
                      {module.icon}
                    </div>

                    <span className="text-lg text-[#a2b3a9] transition group-hover:translate-x-1 group-hover:text-[#176b45]">
                      →
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-black">
                    {module.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#607067]">
                    {module.description}
                  </p>

                  <div className="mt-5 text-xs font-bold uppercase tracking-wider text-[#176b45]">
                    Enter data
                  </div>
                </Link>
              ))}
            </div>

            <section className="mt-8 rounded-3xl border border-[#dce7e0] bg-[#eef7f1] p-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-black text-[#176b45]">
                  i
                </div>

                <div>
                  <h3 className="font-bold text-[#10251b]">
                    Why this information matters
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#607067]">
                    CarbonPilot uses facility-specific operational information
                    to calculate emissions, identify hotspots and generate
                    relevant circular recommendations. No pre-filled factory
                    values are used.
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </ProtectedLayout>
  );
}