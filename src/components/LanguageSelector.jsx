"use client"; // Required for using hooks in the client component

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loaderStatus } from "lib/actions/authActions";
import Loader from "./loader/Loader";

const LanguageSelector = () => {
  const router = useRouter();
  const [lang, setLang] = useState("en");
  const dispatch = useDispatch();

  useEffect(() => {
    const currentLang = window.location.pathname.startsWith("/ar")
      ? "ar"
      : "en";
    setLang(currentLang);
  }, []);

  const handleChange = (event) => {
    dispatch(loaderStatus(true));
    const selectedLang = event.target.value;
    const newPath = window.location.pathname.replace(
      /^\/(en|ar)/,
      `/${selectedLang}`
    );
    router.push(newPath);
    setTimeout(() => {
      dispatch(loaderStatus(false));
    }, 1000);
  };
  const isLoaderActive = useSelector((state) => state.authReducer.isLoading);
  console.log("isLoaderActive ", isLoaderActive);

  return (
    <>
      <select
        value={lang}
        className="rounded-md border-0 bg-transparent border-1 border-[#f3f3f3] py-2 pl-2 rtl:pr-2 rtl:pl-0 pr-7 rtl:pr-0 rtl:pl-7 outline-offset-0 outline-transparent shadow-lg shadow[#8E8E8E45] focus:ring-0 focus:ring-inset focus:ring-transparent"
        onChange={handleChange}
      >
        <option value="en">EN</option>
        <option value="ar">AR</option>
      </select>
      {isLoaderActive ? <Loader /> : null}
    </>
  );
};

export default LanguageSelector;
