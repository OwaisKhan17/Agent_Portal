"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import TPSLogo from "./../../public/images/tps-logo.png";
import { DashboardIcon, LogoutIcon, TransactionIcon } from "./svgIcons/icons";
import { useTranslations } from "next-intl";
import {
  DashboardIcon,
  LogoutIcon,
  TransactionIcon,
  SettingsIcon,
  UserManagement,
  RoleManagement,
  Statements,
} from "./svgIcons/icons";
import { useState } from "react";

export default function SideBarNav() {
  const pathName = usePathname();
  const basePath = pathName.split("/").slice(2).join("/");
  const t = useTranslations();
  const logOut = () => {
    console.log("signOut");
    signOut();
  };

  const [isCashManagementOpen, setCashManagementOpen] = useState(false);

  const toggleCashManagement = () => {
    setCashManagementOpen(!isCashManagementOpen);
  };

  return (
    <div className="fixed left-0 rtl:right-0 rtl:left-auto top-0 bottom-0 py-7 h-screen w-[300px] bg-gradient-to-b from-[#19D2BC] via-[#24243E] to-[#0F0C29]">
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
                <span className="ms-3 text-[#B3C7CB] text-base font-medium">
                {t("dashboard")}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/notification"
                className={`flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-5 ${
                  basePath === "notification" ? "bg-[#024553]" : ""
                }`}
              >
                <TransactionIcon />
                <span className="ms-3 text-[#B3C7CB] text-base font-medium">
                  {t("notification")}
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/transaction"
                className={`flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-5 ${
                  basePath === "transaction" ? "bg-[#024553]" : ""
                }`}
              >
                <Statements />
                <span className="ms-3 text-[#B3C7CB] text-base font-medium">
                  Statements
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={toggleCashManagement}
                className={`flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-5 ${
                  basePath === "cash-management" ? "bg-[#024553]" : ""
                }`}
              >
                <UserManagement />
                <span className="ms-3 text-[#B3C7CB] text-base font-medium">
                  Cash Management
                </span>
              </Link>
              {isCashManagementOpen && (
                <ul className="pl-10 space-y-2">
                  <li>
                    <Link
                      href="/cash-management/money-transfer"
                      className={`flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-2 ${
                        basePath === "money-transfer" ? "bg-[#024553]" : ""
                      }`}
                    >
                      <Statements />
                      <span className="ms-3 text-[#B3C7CB] text-base font-medium">
                        Money Transfer
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cash-management/user-management"
                      className={`flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-2 ${
                        basePath === "user-management" ? "bg-[#024553]" : ""
                      }`}
                    >
                      <Statements />
                      <span className="ms-3 text-[#B3C7CB] text-base font-medium">
                        User Management
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cash-management/role-management"
                      className={`flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-2 ${
                        basePath === "role-management" ? "bg-[#024553]" : ""
                      }`}
                    >
                      <RoleManagement />
                      <span className="ms-3 text-[#B3C7CB] text-base font-medium">
                        Role Management
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                href="/transaction"
                className={`flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-5 ${
                  basePath === "transaction" ? "bg-[#024553]" : ""
                }`}
              >
                <UserManagement />
                <span className="ms-3 text-[#B3C7CB] text-base font-medium">
                  Money Transfer
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/transaction"
                className={`flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-5 ${
                  basePath === "transaction" ? "bg-[#024553]" : ""
                }`}
              >
                <UserManagement />
                <span className="ms-3 text-[#B3C7CB] text-base font-medium">
                  User Management
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/transaction"
                className={`flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-5 ${
                  basePath === "transaction" ? "bg-[#024553]" : ""
                }`}
              >
                <RoleManagement />
                <span className="ms-3 text-[#B3C7CB] text-base font-medium">
                  Role Managament
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/transaction"
                className={`flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-5 ${
                  basePath === "transaction" ? "bg-[#024553]" : ""
                }`}
              >
                <SettingsIcon />
                <span className="ms-3 text-[#B3C7CB] text-base font-medium">
                  Settings
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <Link
        href="#"
        onClick={logOut}
        className={`absolute bottom-0 flex items-center gap-x-1 w-full hover:bg-[#024553] px-7 py-5 `}
      >
        <LogoutIcon />
        <span className="ms-3 text-[#ffffff] text-base font-medium">
        {t("logout")}
        </span>
      </Link>
    </div>
  );
}
