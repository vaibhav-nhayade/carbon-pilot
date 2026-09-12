"use client";

import { useParams } from "next/navigation";
import EnergyForm from "@/components/forms/EnergyForm";

export default function EnergyPage() {
  const params = useParams<{ facilityId: string }>();
  const facilityId = params.facilityId;

  return (
    <main className="page-shell">
      <div className="mb-8">
        <p className="eyebrow">Facility Data</p>
        <h1 className="page-title">Energy</h1>
        <p className="page-subtitle">
          Enter actual energy consumption data for this facility.
        </p>
      </div>

      <section className="card">
        <div className="mb-6">
          <h2 className="section-title">Add Energy Record</h2>
          <p className="section-subtitle">
            CarbonPilot will apply the relevant emission factors during
            carbon analysis.
          </p>
        </div>

        <EnergyForm facilityId={facilityId} />
      </section>
    </main>
  );
}