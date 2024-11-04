"use client";
import { useSelector } from "react-redux";
import LoginComponent from "components/Login";
import SignupComponent from "components/Signup";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import TPSLogo from "./../../../../public/images/tps-logo.png";
import LoginCardVectors from "./../../../assets/images/login-card-vectors.png";
import Loader from "components/loader/Loader";
import RecoverPasswordComponent from "components/RecoverPassword";
import OTPComponent from "components/OTPCode";

export default function AuthLayout() {
  const [isLogin, SetIsLogin] = useState(true);
  const [isRecoverPassword, SetIsRecoverPassword] = useState(true);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const toggleForm = () => {
    SetIsLogin((prev) => !prev);
  };

  const toggleRecoverPassword = () => {
    console.log('toggleRecoverPassword')
    SetIsRecoverPassword((prev) => !prev);
  };

  const showOtp = () => {
    setShowOtpInput(true);
  };
  const t = useTranslations();

  const authReducerData = useSelector((state) => state.authReducer);

  return (
    <>
      <div className="relative bg-white min-h-screen flex items-center justify-center">
        <div className="h-screen w-[400px] bg-gradient-to-b from-[#19D2BC] via-[#24243E] to-[#0F0C29] flex content-center justify-center">
          <div className="relative py-10 pt-20 px-8 flex item-center justify-center flex-col">
            <Image
              src={TPSLogo}
              alt={"TPS Logo"}
              width={"204"}
              height={"60"}
              className="absolute left-0 right-0 mx-auto top-20"
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

        {isRecoverPassword ? (
          <LoginComponent
            toggleForm={toggleForm}
            toggleRecoverPassword={toggleRecoverPassword}
          />
        ) : showOtpInput ? (
          <OTPComponent  length={6}/>
        ) : (
          <RecoverPasswordComponent
            toggleRecoverPassword={toggleRecoverPassword} showOtp={showOtp}
          />
        )}
      </div>
      {authReducerData.isLoading ? <Loader /> : null}
    </>
  );
}
