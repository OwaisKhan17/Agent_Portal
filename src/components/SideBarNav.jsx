"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import TPSLogo from "./../../public/images/tps-logo.png";
import { DashboardIcon, LogoutIcon, TransactionIcon } from "./svgIcons/icons";

export default function SideBarNav() {
  const pathName = usePathname();
  const basePath = pathName.split("/").slice(2).join("/");
  const logOut = () => {
    console.log('signOut')
    signOut();
  }
  return (
    <div className="fixed left-0 top-0 bottom-0 py-7 h-screen w-[300px] bg-gradient-to-b from-[#19D2BC] via-[#24243E] to-[#0F0C29]">
      <Image
        src={TPSLogo}
        alt={"TPS Logo"}
        width={"204"}
        height={"60"}
        className="w-[105px] mx-auto block mb-10"
      />

      <aside className="w-full" aria-label="Sidebar">
        <div className="overflow-y-auto">
          <ul className="space-y-2 font-medium ">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-5 ${
                  basePath === "dashboard" ? "bg-[#024553]" : "not-active"
                }`}
              >
                <DashboardIcon />
                <span className="ms-3 text-[#B3C7CB] text-base font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/transaction"
                className={`flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-5 ${
                  basePath === "transaction" ? "bg-[#024553]" : ""
                }`}
              >
                <TransactionIcon />
                <span className="ms-3 text-[#B3C7CB] text-base font-medium">Transaction</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <Link
        href="#" onClick={logOut} className={`absolute bottom-0 flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-5 `}>
        <LogoutIcon />
        <span className="ms-3 text-[#ffffff] text-base font-medium">Logout</span>
      </Link>
    </div>
  );
}
