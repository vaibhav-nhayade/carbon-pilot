"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export default function FacilityForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    facility_type: "",
    industry_type: "",
    location: "",
    country: "India",
    production_unit: "",
    annual_production: "",
    production_unit_name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (
      !form.name.trim() ||
      !form.facility_type ||
      !form.industry_type ||
      !form.location.trim()
    ) {
      setError(
        "Please complete the facility name, facility type, industry type and location.",
      );
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("carbonpilot_access_token");

      const response = await fetch(`${API_URL}/facilities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          facility_type: form.facility_type,
          industry_type: form.industry_type,
          location: form.location.trim(),
          country: form.country.trim(),
          production_unit: form.production_unit || undefined,
          annual_production: form.annual_production
            ? Number(form.annual_production)
            : undefined,
          production_unit_name:
            form.production_unit_name || undefined,
          description: form.description.trim() || undefined,
        }),
      });

      if (!response.ok) {
        let message = "Unable to create facility.";

        try {
          const data = await response.json();

          if (typeof data.detail === "string") {
            message = data.detail;
          }
        } catch {
          // Keep default error.
        }

        throw new Error(message);
      }

      const facility = await response.json();

      router.push(`/facilities/${facility.id}`);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create facility.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <section>
        <div className="mb-5">
          <h2 className="text-lg font-black">Facility identity</h2>
          <p className="mt-1 text-sm leading-6 text-[#607067]">
            Provide the basic information required to identify this
            industrial facility.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Facility name *"
            placeholder="e.g. Pune Manufacturing Plant"
            value={form.name}
            onChange={(value) => update("name", value)}
          />

          <Select
            label="Facility type *"
            value={form.facility_type}
            onChange={(value) => update("facility_type", value)}
            options={[
              ["", "Select facility type"],
              ["manufacturing_plant", "Manufacturing Plant"],
              ["processing_unit", "Processing Unit"],
              ["warehouse", "Warehouse"],
              ["refinery", "Refinery"],
              ["power_facility", "Power / Energy Facility"],
              ["other", "Other"],
            ]}
          />

          <Select
            label="Industry type *"
            value={form.industry_type}
            onChange={(value) => update("industry_type", value)}
            options={[
              ["", "Select industry"],
              ["manufacturing", "Manufacturing"],
              ["textiles", "Textiles"],
              ["chemicals", "Chemicals"],
              ["food_processing", "Food Processing"],
              ["metals", "Metals"],
              ["automotive", "Automotive"],
              ["construction_materials", "Construction Materials"],
              ["pharmaceuticals", "Pharmaceuticals"],
              ["other", "Other"],
            ]}
          />

          <Field
            label="Location *"
            placeholder="City / industrial area"
            value={form.location}
            onChange={(value) => update("location", value)}
          />

          <Field
            label="Country"
            value={form.country}
            onChange={(value) => update("country", value)}
          />
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-lg font-black">Production context</h2>
          <p className="mt-1 text-sm leading-6 text-[#607067]">
            Optional production information helps contextualize future
            emission analysis.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Production category"
            placeholder="e.g. Finished steel"
            value={form.production_unit}
            onChange={(value) => update("production_unit", value)}
          />

          <Field
            label="Annual production"
            type="number"
            min="0"
            placeholder="Enter actual value"
            value={form.annual_production}
            onChange={(value) => update("annual_production", value)}
          />

          <Field
            label="Production unit"
            placeholder="e.g. tonnes/year"
            value={form.production_unit_name}
            onChange={(value) =>
              update("production_unit_name", value)
            }
          />
        </div>
      </section>

      <section>
        <label className="mb-2 block text-sm font-semibold text-[#263b30]">
          Facility description
        </label>

        <textarea
          value={form.description}
          onChange={(event) =>
            update("description", event.target.value)
          }
          rows={5}
          placeholder="Describe the facility, major processes, products or other useful context."
          className="w-full resize-none rounded-2xl border border-[#d5e1da] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9aa9a1] focus:border-[#176b45] focus:ring-4 focus:ring-[#176b45]/10"
        />
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-[#eef2ef] pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/facilities")}
          className="rounded-xl border border-[#d5e1da] px-5 py-3 text-sm font-bold text-[#607067] transition hover:bg-[#f7faf8]"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#176b45] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#176b45]/20 transition hover:bg-[#0d4d31] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating facility..." : "Create facility"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  min?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#263b30]">
        {label}
      </label>

      <input
        type={type}
        min={min}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#d5e1da] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9aa9a1] focus:border-[#176b45] focus:ring-4 focus:ring-[#176b45]/10"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[][];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#263b30]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[#d5e1da] bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#176b45] focus:ring-4 focus:ring-[#176b45]/10"
      >
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}