"use client";

import { FormEvent, useState } from "react";
import { createFacilityData } from "@/lib/api";
import { EnergyRecord } from "@/types/industrial-data";

interface EnergyFormProps {
  facilityId: string;
  onSaved?: () => void;
}

export default function EnergyForm({
  facilityId,
  onSaved,
}: EnergyFormProps) {
  const [form, setForm] = useState<EnergyRecord>({
    record_date: new Date().toISOString().split("T")[0],
    energy_source: "grid_electricity",
    quantity: 0,
    unit: "kWh",
    renewable_percentage: 0,
    notes: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof EnergyRecord>(
    key: K,
    value: EnergyRecord[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (form.quantity <= 0) {
      setError("Quantity must be greater than zero.");
      return;
    }

    try {
      setSaving(true);

      await createFacilityData(facilityId, "energy", form);

      setForm((prev) => ({
        ...prev,
        quantity: 0,
        notes: "",
      }));

      onSaved?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save energy data."
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
          <label className="label">Energy Source</label>
          <select
            className="input"
            value={form.energy_source}
            onChange={(e) => update("energy_source", e.target.value)}
          >
            <option value="grid_electricity">Grid Electricity</option>
            <option value="diesel">Diesel</option>
            <option value="natural_gas">Natural Gas</option>
            <option value="coal">Coal</option>
            <option value="biomass">Biomass</option>
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
            <option value="kWh">kWh</option>
            <option value="MWh">MWh</option>
            <option value="litres">Litres</option>
            <option value="kg">kg</option>
            <option value="tonnes">Tonnes</option>
            <option value="GJ">GJ</option>
          </select>
        </div>

        <div>
          <label className="label">Renewable Share (%)</label>
          <input
            className="input"
            type="number"
            min="0"
            max="100"
            step="any"
            value={form.renewable_percentage ?? 0}
            onChange={(e) =>
              update("renewable_percentage", Number(e.target.value))
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
        {saving ? "Saving..." : "Save Energy Record"}
      </button>
    </form>
  );
}