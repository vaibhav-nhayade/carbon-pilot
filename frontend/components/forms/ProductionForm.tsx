"use client";

import { FormEvent, useState } from "react";
import { createFacilityData } from "@/lib/api";
import { ProductionRecord } from "@/types/industrial-data";

interface ProductionFormProps {
  facilityId: string;
  onSaved?: () => void;
}

export default function ProductionForm({
  facilityId,
  onSaved,
}: ProductionFormProps) {
  const [form, setForm] = useState<ProductionRecord>({
    record_date: new Date().toISOString().split("T")[0],
    product_name: "",
    quantity: 0,
    unit: "units",
    operating_hours: 0,
    process_name: "",
    notes: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof ProductionRecord>(
    key: K,
    value: ProductionRecord[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!form.product_name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (form.quantity <= 0) {
      setError("Production quantity must be greater than zero.");
      return;
    }

    try {
      setSaving(true);

      await createFacilityData(facilityId, "production", form);

      setForm((prev) => ({
        ...prev,
        product_name: "",
        quantity: 0,
        operating_hours: 0,
        process_name: "",
        notes: "",
      }));

      onSaved?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save production data."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="label">Record Date</label>
          <input
            className="input"
            type="date"
            value={form.record_date}
            onChange={(e) => update("record_date", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">Product Name</label>
          <input
            className="input"
            type="text"
            value={form.product_name}
            onChange={(e) => update("product_name", e.target.value)}
            placeholder="Enter actual product"
            required
          />
        </div>

        <div>
          <label className="label">Production Quantity</label>
          <input
            className="input"
            type="number"
            min="0"
            step="any"
            value={form.quantity}
            onChange={(e) => update("quantity", Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="label">Unit</label>
          <select
            className="input"
            value={form.unit}
            onChange={(e) => update("unit", e.target.value)}
          >
            <option value="units">Units</option>
            <option value="kg">kg</option>
            <option value="tonnes">Tonnes</option>
            <option value="litres">Litres</option>
            <option value="m3">m³</option>
          </select>
        </div>

        <div>
          <label className="label">Operating Hours</label>
          <input
            className="input"
            type="number"
            min="0"
            step="any"
            value={form.operating_hours ?? 0}
            onChange={(e) =>
              update("operating_hours", Number(e.target.value))
            }
          />
        </div>

        <div>
          <label className="label">Process Name</label>
          <input
            className="input"
            type="text"
            value={form.process_name ?? ""}
            onChange={(e) => update("process_name", e.target.value)}
            placeholder="Optional"
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Notes</label>
          <textarea
            className="input min-h-24"
            value={form.notes ?? ""}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Optional production notes"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="btn-primary"
      >
        {saving ? "Saving..." : "Save Production Record"}
      </button>
    </form>
  );
}