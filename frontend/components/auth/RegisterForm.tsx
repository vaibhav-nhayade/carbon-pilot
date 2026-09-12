"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api";
import { setAuthSession } from "@/lib/auth";
import type { UserRole } from "@/types/auth";

const roles: Array<{ value: UserRole; label: string }> = [
  {
    value: "industry_admin",
    label: "Industry Administrator",
  },
  {
    value: "facility_manager",
    label: "Facility Manager",
  },
  {
    value: "sustainability_manager",
    label: "Sustainability Manager",
  },
  {
    value: "analyst",
    label: "Analyst",
  },
];

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "industry_admin" as UserRole,
    organization_name: "",
    industry_type: "",
    organization_size: "",
    phone: "",
    country: "India",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: string, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (
      !form.full_name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.organization_name.trim() ||
      !form.industry_type ||
      !form.organization_size
    ) {
      setError("Please complete all required business and account fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await register({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
        organization_name: form.organization_name.trim(),
        industry_type: form.industry_type,
        organization_size: form.organization_size,
        phone: form.phone.trim() || undefined,
        country: form.country,
      });

      setAuthSession(response.access_token, response.user);

      router.push("/onboarding");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create the account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div>
        <h3 className="text-sm font-bold text-[#10251b]">Account details</h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field
            id="full_name"
            label="Full name"
            placeholder="Your full name"
            value={form.full_name}
            onChange={(value) => updateField("full_name", value)}
          />

          <Field
            id="email"
            type="email"
            label="Business email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(value) => updateField("email", value)}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#263b30]">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(event) =>
              updateField("password", event.target.value)
            }
            placeholder="Minimum 8 characters"
            className="w-full rounded-2xl border border-[#d5e1da] bg-white px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-[#9aa9a1] focus:border-[#176b45] focus:ring-4 focus:ring-[#176b45]/10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#607067]"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <Field
        id="confirm_password"
        type={showPassword ? "text" : "password"}
        label="Confirm password"
        placeholder="Re-enter your password"
        value={form.confirm_password}
        onChange={(value) => updateField("confirm_password", value)}
      />

      <div>
        <h3 className="text-sm font-bold text-[#10251b]">
          Business / industry profile
        </h3>

        <div className="mt-4 space-y-4">
          <Field
            id="organization_name"
            label="Business / industry name"
            placeholder="e.g. ABC Manufacturing Pvt. Ltd."
            value={form.organization_name}
            onChange={(value) =>
              updateField("organization_name", value)
            }
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Industry type"
              value={form.industry_type}
              onChange={(value) =>
                updateField("industry_type", value)
              }
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

            <SelectField
              label="Organization size"
              value={form.organization_size}
              onChange={(value) =>
                updateField("organization_size", value)
              }
              options={[
                ["", "Select size"],
                ["micro", "Micro"],
                ["small", "Small"],
                ["medium", "Medium"],
                ["large", "Large"],
                ["enterprise", "Enterprise"],
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Your role"
              value={form.role}
              onChange={(value) =>
                updateField("role", value as UserRole)
              }
              options={roles.map((role) => [
                role.value,
                role.label,
              ])}
            />

            <Field
              id="country"
              label="Country"
              value={form.country}
              onChange={(value) => updateField("country", value)}
            />
          </div>

          <Field
            id="phone"
            label="Phone number"
            placeholder="+91 ..."
            value={form.phone}
            onChange={(value) => updateField("phone", value)}
          />
        </div>
      </div>

      <label className="flex gap-3 text-xs leading-5 text-[#607067]">
        <input
          type="checkbox"
          required
          className="mt-1 h-4 w-4 accent-[#176b45]"
        />
        <span>
          I confirm that the information submitted belongs to my
          organization and I understand that CarbonPilot AI provides
          decision support rather than replacing qualified industrial
          judgment.
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-[#176b45] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#176b45]/20 transition hover:bg-[#0d4d31] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create CarbonPilot account"}
      </button>

      <p className="text-center text-sm text-[#607067]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-[#176b45] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#263b30]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#d5e1da] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9aa9a1] focus:border-[#176b45] focus:ring-4 focus:ring-[#176b45]/10"
      />
    </div>
  );
}

function SelectField({
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
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}