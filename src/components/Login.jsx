import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import InputField from "./inputField/InputField";
import CopyRight from "./copyRight/CopyRight";
import { EyeSlashFilledIcon, EyeSlashUnfilledIcon } from "./svgIcons/icons";
import Loader from "./loader/Loader";
import { useDispatch } from "react-redux";
import { GetUserInfo, loaderStatus } from "lib/actions/authActions";
import { useTranslations } from "next-intl";

export default function LoginComponent({ toggleForm }) {
  const t = useTranslations();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [message, setMessage] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loaderStatus(true));
    setMessage("");
    const result = await signIn("credentials", {
      accessIdentifier: username,
      accessKey: password,
      companyCode: companyCode,
      accessKeyType: "password",
      portalId: "9",
      deviceId: "",
      pushId: "",
      redirect: false,
    });
    dispatch(loaderStatus(false));
    console.log("resultresultresultresult", result);
    if (result.error) {
      setMessage(result.error);
      return false;
    } else {
      // Redirect to the dashboard or home page
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="flex justify-center h-screen items-center w-[calc(100%-400px)] relative z-10">
      <div className="p-12 bg-[#FFFEF9] mx-auto rounded-3xl w-[540px] shadow-[0px_4px_72px_9px_rgba(26,125,126,0.23)]">
        <div className="mb-7">
          <h1 className="font-semibold text-2xl text-[#00000085] text-center">
            {t("Welcome_to_agency_portal")}
          </h1>
          <h2 className="font-bold text-4xl mt-8 mb-14 text-[#272746] text-center">
            {t("Lets_get_started")}
          </h2>
        </div>
        {/* <form onSubmit={handleSubmit}> */}

        <div className="space-y-6">
          <div>
            <InputField
              labelClasses="text-base text-black font-normal"
              labelText={t("Enter_company_code")}
              fieldClasses="w-full text-sm mt-2 px-4 py-4 border border-[#8E8E8E] rounded-md bg-transparentt"
              fieldType="text"
              fieldValue={companyCode}
              fieldPlaceholder={t("Enter_company_code")}
              onChange={(e) => setCompanyCode(e.target.value)}
            />
          </div>
          <div>
            <InputField
              labelClasses="text-base text-black font-normal"
              labelText={t("Enter_your_username_or_email_address")}
              fieldClasses="w-full text-sm mt-2 px-4 py-4 border border-[#8E8E8E] rounded-md bg-transparentt"
              fieldType="text"
              fieldValue={username}
              fieldPlaceholder={t("Enter_your_username_or_email_address")}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative mt-4">
            <InputField
              labelClasses="text-base text-black font-normal"
              labelText={t("Enter_your_password")}
              fieldClasses="w-full text-sm mt-2 px-4 py-4 border border-[#8E8E8E] rounded-md bg-transparent"
              fieldType={isVisible ? "text" : "password"}
              fieldValue={password}
              fieldPlaceholder={t("Enter_your_password")}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="focus:outline-none flex items-center right-[20px] top-[50px] absolute text-sm leading-5"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeSlashUnfilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>

            <div className="flex justify-between items-center mt-1">
              {/* <Link href="#" className="text-sm font-normal text-[#1B9E97]">
                Forgot Username
              </Link> */}
              <Link href="#" className="text-sm font-normal text-[#0F416A]">
                {t("Forgot_password")}
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#159D97] text-white font-medium text-base w-full flex justify-center p-x py-4 rounded-lg
                font-semibold shadow-[0_4px_19px_0_rgba(119, 147, 65, 0.3)] cursor-pointer"
              onClick={handleSubmit}
            >
              {t("Login")}
            </button>
          </div>
          <div>
            <p className="text-[#8D8D8D] text-center text-base font-normal mt-4">
              {t("You_dont_have_an_account")}
              <Link
                href="#"
                onClick={toggleForm}
                className="underline text-[#1B9993]"
              >
                {t("Sign_up")}
              </Link>
            </p>
          </div>
        </div>
        <p className="text-red-500 mt-2">{message}</p>
      </div>

      <CopyRight />
    </div>
  );
}
