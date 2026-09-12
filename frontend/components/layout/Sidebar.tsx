"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Overview", icon: "⌂" },
  { href: "/facilities", label: "Facilities", icon: "▦" },
  { href: "/reports", label: "Reports", icon: "▤" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-[#dce7e0] bg-white lg:flex lg:min-h-[calc(100vh-4rem)] lg:flex-col">
      <div className="border-b border-[#eef2ef] p-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#176b45] text-lg font-black text-white">
            C
          </div>
          <div>
            <div className="font-black tracking-tight">CarbonPilot</div>
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#607067]">
              AI Platform
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9a91]">
          Workspace
        </div>

        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/dashboard" &&
              pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-[#eef7f1] text-[#176b45]"
                  : "text-[#607067] hover:bg-[#f7faf8] hover:text-[#176b45]"
              }`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs shadow-sm">
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-4 rounded-2xl bg-[#10251b] p-5 text-white">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8dd5aa]">
          CarbonPilot
        </div>
        <p className="mt-3 text-sm font-semibold leading-6">
          Measure. Identify. Decide. Act.
        </p>
      </div>
    </aside>
  );
}