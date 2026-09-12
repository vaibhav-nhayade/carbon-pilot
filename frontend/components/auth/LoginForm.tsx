"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { setAuthSession } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await login({
        email: email.trim(),
        password,
      });

      setAuthSession(response.access_token, response.user);

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-[#263b30]"
        >
          Business email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-2xl border border-[#d5e1da] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9aa9a1] focus:border-[#176b45] focus:ring-4 focus:ring-[#176b45]/10"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-[#263b30]"
          >
            Password
          </label>
          <button
            type="button"
            className="text-xs font-semibold text-[#176b45]"
          >
            Forgot password?
          </button>
        </div>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
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

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-[#176b45] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#176b45]/20 transition hover:bg-[#0d4d31] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in to CarbonPilot"}
      </button>

      <p className="text-center text-sm text-[#607067]">
        New to CarbonPilot?{" "}
        <Link
          href="/register"
          className="font-bold text-[#176b45] hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}