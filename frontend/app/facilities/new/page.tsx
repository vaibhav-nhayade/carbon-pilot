import Link from "next/link";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import FacilityForm from "@/components/facilities/FacilityForm";

export default function NewFacilityPage() {
  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-4xl px-5 py-8 lg:px-8">
        <div className="mb-8">
          <Link
            href="/facilities"
            className="text-sm font-semibold text-[#176b45] hover:underline"
          >
            ← Back to facilities
          </Link>

          <div className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#176b45]">
            Facility onboarding
          </div>

          <h1 className="mt-2 text-3xl font-black tracking-[-0.035em]">
            Create an industrial facility
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#607067]">
            Start with the facility context. After creation, you will enter
            actual energy, material, production and waste information used
            for carbon analysis.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#dce7e0] bg-white p-6 shadow-sm sm:p-9">
          <FacilityForm />
        </div>
      </div>
    </ProtectedLayout>
  );
}