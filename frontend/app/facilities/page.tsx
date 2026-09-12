"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import FacilityCard from "@/components/facilities/FacilityCard";
import type { Facility } from "@/types/facility";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFacilities() {
      try {
        const token = localStorage.getItem("carbonpilot_access_token");

        const response = await fetch(`${API_URL}/facilities`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unable to load your facilities.");
        }

        const data = await response.json();

        setFacilities(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load facilities.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadFacilities();
  }, []);

  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#176b45]">
              Industrial workspace
            </div>

            <h1 className="mt-2 text-3xl font-black tracking-[-0.035em]">
              Your facilities
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#607067]">
              Manage your authenticated industrial facilities and their
              operational data.
            </p>
          </div>

          <Link
            href="/facilities/new"
            className="rounded-xl bg-[#176b45] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#176b45]/20 transition hover:bg-[#0d4d31]"
          >
            + Add facility
          </Link>
        </div>

        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-3xl border border-[#dce7e0] bg-white"
              />
            ))}
          </div>
        ) : facilities.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-dashed border-[#c9d9cf] bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef7f1] text-xl font-black text-[#176b45]">
              F
            </div>

            <h2 className="mt-6 text-xl font-black">
              No facilities added yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#607067]">
              Add your first industrial facility. Your carbon analysis will
              be generated only from the operational information you provide.
            </p>

            <Link
              href="/facilities/new"
              className="mt-6 inline-flex rounded-xl bg-[#176b45] px-5 py-3 text-sm font-bold text-white"
            >
              Create first facility
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {facilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
}