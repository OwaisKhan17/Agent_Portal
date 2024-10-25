import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import InputField from "./inputField/InputField";
import CopyRight from "./copyRight/CopyRight";

export default function LoginComponent({ toggleForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
    } else {
      // Redirect to the dashboard or home page
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="flex justify-center h-screen items-center w-[calc(100%-400px)] relative z-10">
      <div className="p-12 bg-[#FFFEF9] mx-auto rounded-3xl w-[540px] shadow-[0px_4px_72px_9px_rgba(26,125,126,0.23)]">
        <div className="mb-7">
          <h1 className="font-semibold text-2xl	text-[#00000085] text-center">
            Welcome to Agency Portal
          </h1>
          <h2 className="font-bold text-4xl mt-8 mb-14 text-[#272746] text-center">
            Lets Get Started
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
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
                fieldType="password"
                fieldValue={password}
                fieldPlaceholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
 
              <div className="flex items-center right-[20px] top-[50px] absolute text-sm leading-5">
                <svg
                  className="h-4 text-[#8E8E8E] block size-5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>

              <div className="flex justify-between items-center mt-1">
                <Link href="#" className="text-sm font-normal text-[#1B9E97]">
                  Forgot Username
                </Link>
                <Link href="#" className="text-sm font-normal text-[#0F416A]">
                  Forgot Password
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#159D97] text-white font-medium text-base w-full flex justify-center p-x py-4 rounded-lg 
                font-semibold shadow-[0_4px_19px_0_rgba(119, 147, 65, 0.3)] cursor-pointer" >
                Login
              </button>
            </div>
            <div>
            <p className="text-[#8D8D8D] text-center text-base font-normal mt-4">You dont have an Account?
              <Link href="#" onClick={toggleForm} className="underline text-[#1B9993]"> Sign up</Link>
              </p>
            </div>
          </div>
          <p className="text-red-500 mt-2">{message}</p>
        </form>
      </div>
      
      <CopyRight />
    </div>
  );
}
