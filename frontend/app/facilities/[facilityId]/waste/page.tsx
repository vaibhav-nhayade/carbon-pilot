"use client";

import { useParams } from "next/navigation";
import WasteForm from "@/components/forms/WasteForm";

export default function WastePage() {
  const params = useParams<{ facilityId: string }>();
  const facilityId = params.facilityId;

  return (
    <main className="page-shell">
      <div className="mb-8">
        <p className="eyebrow">Facility Data</p>
        <h1 className="page-title">Waste</h1>
        <p className="page-subtitle">
          Record actual waste generation, recovery and disposal data.
        </p>
      </div>

      <section className="card">
        <div className="mb-6">
          <h2 className="section-title">Add Waste Record</h2>
          <p className="section-subtitle">
            These records will feed hotspot detection and circular
            alternative recommendations.
          </p>
        </div>

        <WasteForm facilityId={facilityId} />
      </section>
    </main>
  );
}