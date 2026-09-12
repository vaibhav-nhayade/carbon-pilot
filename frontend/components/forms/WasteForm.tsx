"use client";

import { FormEvent, useState } from "react";
import { createFacilityData } from "@/lib/api";
import { WasteRecord } from "@/types/industrial-data";

interface WasteFormProps {
  facilityId: string;
  onSaved?: () => void;
}

export default function WasteForm({
  facilityId,
  onSaved,
}: WasteFormProps) {
  const [form, setForm] = useState<WasteRecord>({
    record_date: new Date().toISOString().split("T")[0],
    waste_type: "",
    quantity: 0,
    unit: "kg",
    treatment_method: "recycling",
    recovered_quantity: 0,
    disposal_quantity: 0,
    notes: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof WasteRecord>(
    key: K,
    value: WasteRecord[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!form.waste_type.trim()) {
      setError("Waste type is required.");
      return;
    }

    if (form.quantity <= 0) {
      setError("Waste quantity must be greater than zero.");
      return;
    }

    try {
      setSaving(true);

      await createFacilityData(facilityId, "waste", form);

      setForm((prev) => ({
        ...prev,
        waste_type: "",
        quantity: 0,
        recovered_quantity: 0,
        disposal_quantity: 0,
        notes: "",
      }));

      onSaved?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save waste data."
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
          <label className="label">Waste Type</label>
          <input
            className="input"
            type="text"
            value={form.waste_type}
            onChange={(e) => update("waste_type", e.target.value)}
            placeholder="Enter actual waste type"
            required
          />
        </div>

        <div>
          <label className="label">Total Quantity</label>
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
            <option value="litres">Litres</option>
            <option value="m3">m³</option>
          </select>
        </div>

        <div>
          <label className="label">Treatment Method</label>
          <select
            className="input"
            value={form.treatment_method}
            onChange={(e) =>
              update("treatment_method", e.target.value)
            }
          >
            <option value="recycling">Recycling</option>
            <option value="reuse">Reuse</option>
            <option value="recovery">Recovery</option>
            <option value="landfill">Landfill</option>
            <option value="incineration">Incineration</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="label">Recovered Quantity</label>
          <input
            className="input"
            type="number"
            min="0"
            step="any"
            value={form.recovered_quantity ?? 0}
            onChange={(e) =>
              update("recovered_quantity", Number(e.target.value))
            }
          />
        </div>

        <div>
          <label className="label">Disposed Quantity</label>
          <input
            className="input"
            type="number"
            min="0"
            step="any"
            value={form.disposal_quantity ?? 0}
            onChange={(e) =>
              update("disposal_quantity", Number(e.target.value))
            }
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
        {saving ? "Saving..." : "Save Waste Record"}
      </button>
    </form>
  );
}