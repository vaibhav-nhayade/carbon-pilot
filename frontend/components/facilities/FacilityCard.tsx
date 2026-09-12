import Link from "next/link";
import type { Facility } from "@/types/facility";

export default function FacilityCard({
  facility,
}: {
  facility: Facility;
}) {
  return (
    <Link
      href={`/facilities/${facility.id}`}
      className="group block rounded-3xl border border-[#dce7e0] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#b9d9c6] hover:shadow-xl hover:shadow-[#174b34]/5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef7f1] text-lg font-black text-[#176b45]">
          F
        </div>

        <span className="rounded-full bg-[#eef7f1] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#176b45]">
          Facility
        </span>
      </div>

      <h2 className="mt-6 text-xl font-black tracking-tight group-hover:text-[#176b45]">
        {facility.name}
      </h2>

      <p className="mt-2 text-sm text-[#607067]">
        {facility.industry_type?.replaceAll("_", " ")}
      </p>

      <div className="mt-5 space-y-2 border-t border-[#eef2ef] pt-5 text-xs text-[#607067]">
        <div className="flex justify-between gap-4">
          <span>Location</span>
          <span className="font-semibold text-[#263b30]">
            {facility.location}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span>Type</span>
          <span className="font-semibold capitalize text-[#263b30]">
            {facility.facility_type?.replaceAll("_", " ")}
          </span>
        </div>
      </div>

      <div className="mt-5 text-sm font-bold text-[#176b45]">
        Open facility →
      </div>
    </Link>
  );
}