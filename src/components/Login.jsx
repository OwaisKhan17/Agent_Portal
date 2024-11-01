import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import InputField from "./inputField/InputField";
import CopyRight from "./copyRight/CopyRight";
import { EyeSlashFilledIcon, EyeSlashUnfilledIcon } from "./svgIcons/icons";
 
export default function LoginComponent({ toggleForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
 
  const [isVisible, setIsVisible] = useState(false);
 
  const toggleVisibility = () => setIsVisible(!isVisible);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
 
    if (result.error) {
      setMessage(result.error);
      return false;
    }
  };
 
  return (
    <div className="flex justify-center h-screen items-center w-[calc(100%-400px)] relative z-10">
      <div className="p-12 bg-[#FFFEF9] mx-auto rounded-3xl w-[540px] shadow-[0px_4px_72px_9px_rgba(26,125,126,0.23)]">
        <div className="mb-7">
          <h1 className="font-semibold text-2xl text-[#00000085] text-center">
            Welcome to Agency Portal
          </h1>
          <h2 className="font-bold text-4xl mt-8 mb-14 text-[#272746] text-center">
            Lets Get Started
          </h2>
        </div>
        <div className="space-y-6">
          <div className="">
            <InputField
              labelClasses="text-base text-black font-normal"
              labelText="Enter your username or email address"
              fieldClasses="w-full text-sm mt-2 px-4 py-4 border border-[#8E8E8E] rounded-md bg-transparentt"
              fieldType="text"
              fieldValue={username}
              fieldPlaceholder="Username or email address"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative mt-4">
            <InputField
              labelClasses="text-base text-black font-normal"
              labelText="Enter your Password"
              fieldClasses="w-full text-sm mt-2 px-4 py-4 border border-[#8E8E8E] rounded-md bg-transparent"
              fieldType={isVisible ? "text" : "password"}
              fieldValue={password}
              fieldPlaceholder="Password"
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
                Forgot Password
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
              Login
            </button>
          </div>
          <div>
            <p className="text-[#8D8D8D] text-center text-base font-normal mt-4">
              You dont have an Account?
              <Link
                href="#"
                onClick={toggleForm}
                className="underline text-[#1B9993]"
              >
                {" "}
                Sign up
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