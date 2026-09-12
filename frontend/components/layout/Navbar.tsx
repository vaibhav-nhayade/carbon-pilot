"use client";

import { useRouter } from "next/navigation";
import { clearAuthSession, getCurrentUser } from "@/lib/auth";

export default function Navbar() {
  const router = useRouter();
  const user = getCurrentUser();

  function logout() {
    clearAuthSession();
    router.replace("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#dce7e0] bg-white/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#176b45] text-sm font-black text-white">
            C
          </div>
          <span className="font-bold">CarbonPilot AI</span>
        </div>

        <div className="hidden lg:block">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#607067]">
            Industrial Carbon Intelligence
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <div className="text-sm font-bold text-[#10251b]">
              {user?.full_name || "User"}
            </div>
            <div className="text-[11px] capitalize text-[#607067]">
              {user?.role?.replaceAll("_", " ") || "Account"}
            </div>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-[#d5e1da] px-3 py-2 text-xs font-bold text-[#52645a] transition hover:bg-[#eef7f1] hover:text-[#176b45]"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}