"use client";
import LoginComponent from "components/Login";
import SignupComponent from "components/Signup";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import TPSLogo from "./../../../../public/images/tps-logo.png"
import LoginCardVectors from "./../../../assets/images/login-card-vectors.png"

export default function AuthLayout() {
  const [isLogin, SetIsLogin] = useState(true);
  const toggleForm = () => {
    SetIsLogin((prev) => !prev);
  };
  const t = useTranslations();

  return (
    <>
      <div>
        <div className="relative bg-white min-h-screen flex items-center justify-center">
          <div className="h-screen w-[400px] bg-gradient-to-b from-[#19D2BC] via-[#24243E] to-[#0F0C29] flex content-center justify-center">
            <div className="py-10 px-8">
              <Image
                src={TPSLogo}
                alt={"TPS Logo"}
                width={"204"}
                height={"60"}
              />
              <Image
                src={LoginCardVectors}
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
