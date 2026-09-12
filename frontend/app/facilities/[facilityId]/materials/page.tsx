"use client";

import { useParams } from "next/navigation";
import MaterialForm from "@/components/forms/MaterialForm";

export default function MaterialsPage() {
  const params = useParams<{ facilityId: string }>();
  const facilityId = params.facilityId;

  return (
    <main className="page-shell">
      <div className="mb-8">
        <p className="eyebrow">Facility Data</p>
        <h1 className="page-title">Materials</h1>
        <p className="page-subtitle">
          Record the actual materials consumed by this facility.
        </p>
      </div>

      <section className="card">
        <div className="mb-6">
          <h2 className="section-title">Add Material Record</h2>
          <p className="section-subtitle">
            Use measured procurement or consumption data wherever
            available.
          </p>
        </div>

        <MaterialForm facilityId={facilityId} />
      </section>
    </main>
  );
}