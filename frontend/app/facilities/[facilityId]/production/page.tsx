"use client";

import { useParams } from "next/navigation";
import ProductionForm from "@/components/forms/ProductionForm";

export default function ProductionPage() {
  const params = useParams<{ facilityId: string }>();
  const facilityId = params.facilityId;

  return (
    <main className="page-shell">
      <div className="mb-8">
        <p className="eyebrow">Facility Data</p>
        <h1 className="page-title">Production</h1>
        <p className="page-subtitle">
          Enter actual production output and operating information.
        </p>
      </div>

      <section className="card">
        <div className="mb-6">
          <h2 className="section-title">Add Production Record</h2>
          <p className="section-subtitle">
            Production data helps CarbonPilot calculate meaningful
            intensity metrics.
          </p>
        </div>

        <ProductionForm facilityId={facilityId} />
      </section>
    </main>
  );
}