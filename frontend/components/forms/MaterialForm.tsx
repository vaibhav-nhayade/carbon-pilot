"use client";

import { FormEvent, useState } from "react";
import { createFacilityData } from "@/lib/api";
import { MaterialRecord } from "@/types/industrial-data";

interface MaterialFormProps {
  facilityId: string;
  onSaved?: () => void;
}

export default function MaterialForm({
  facilityId,
  onSaved,
}: MaterialFormProps) {
  const [form, setForm] = useState<MaterialRecord>({
    record_date: new Date().toISOString().split("T")[0],
    material_name: "",
    category: "raw_material",
    quantity: 0,
    unit: "kg",
    recycled_content_percentage: 0,
    supplier: "",
    notes: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof MaterialRecord>(
    key: K,
    value: MaterialRecord[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!form.material_name.trim()) {
      setError("Material name is required.");
      return;
    }

    if (form.quantity <= 0) {
      setError("Quantity must be greater than zero.");
      return;
    }

    try {
      setSaving(true);

      await createFacilityData(facilityId, "materials", form);

      setForm((prev) => ({
        ...prev,
        material_name: "",
        quantity: 0,
        supplier: "",
        notes: "",
      }));

      onSaved?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save material data."
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
          <label className="label">Material Name</label>
          <input
            className="input"
            type="text"
            value={form.material_name}
            onChange={(e) => update("material_name", e.target.value)}
            placeholder="Enter actual material"
            required
          />
        </div>

        <div>
          <label className="label">Category</label>
          <select
            className="input"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="raw_material">Raw Material</option>
            <option value="packaging">Packaging</option>
            <option value="chemical">Chemical</option>
            <option value="metal">Metal</option>
            <option value="plastic">Plastic</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="label">Quantity</label>
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
            <option value="kg">kg</option>
            <option value="tonnes">Tonnes</option>
          </select>
        </div>

        <div>
          <label className="label">Recycled Content (%)</label>
          <input
            className="input"
            type="number"
            min="0"
            max="100"
            step="any"
            value={form.recycled_content_percentage ?? 0}
            onChange={(e) =>
              update(
                "recycled_content_percentage",
                Number(e.target.value)
              )
            }
          />
        </div>

        <div>
          <label className="label">Supplier</label>
          <input
            className="input"
            type="text"
            value={form.supplier ?? ""}
            onChange={(e) => update("supplier", e.target.value)}
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="label">Notes</label>
          <input
            className="input"
            type="text"
            value={form.notes ?? ""}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Optional"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="btn-primary"
      >
        {saving ? "Saving..." : "Save Material Record"}
      </button>
    </form>
  );
}