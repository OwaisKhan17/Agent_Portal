"use client";
import LoginComponent from "components/Login";
import SignupComponent from "components/Signup";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function AuthLayout() {
  const [isLogin, SetIsLogin] = useState(true);
  const toggleForm = () => {
    SetIsLogin((prev) => !prev);
  };
  const t = useTranslations("HomePage");

  return (
    <>
      <div>
        <div className="relative bg-white min-h-screen flex items-center justify-center">
          <div className="h-screen w-[400px] bg-gradient-to-b from-[#19D2BC] via-[#24243E] to-[#0F0C29]">
            <div className="py-10 px-8">
              <Image
                src="/images/tps-logo.png"
                alt={"TPS Logo"}
                width={"204"}
                height={"60"}
              />
              <Image
                src="/images/login-card-vectors.png"
                alt={"Card Vector"}
                width={"401"}
                height={"384"}
              />
              <h1 className="mb-4 font-bold text-white text-4xl text-center leading-[46px]">
                {t("partnership_for_business_growth")}
              </h1>
              <p className="text-base text-center text-[#BDBDBD]">
                {t("login_description")}
              </p>
            </div>
          </div>

          {isLogin ? (
            <LoginComponent toggleForm={toggleForm} />
          ) : (
            <SignupComponent toggleForm={toggleForm} />
          )}
        </div>
      </div>
    </>
  );
}
