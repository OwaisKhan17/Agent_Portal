import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import InputField from "./inputField/InputField";
import CopyRight from "./copyRight/CopyRight";
import Loader from "./loader/Loader";
import { useDispatch } from "react-redux";
import { loaderStatus } from "lib/actions/authActions";

export default function RecoverPasswordComponent({ toggleRecoverPassword, showOtp }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loaderStatus(true));
    setMessage("");
    showOtp();
    dispatch(loaderStatus(false));
    // const result = await signIn("credentials", {
    //   accessIdentifier: username,
    //   accessKey: password,
    //   accessKeyType: "password",
    //   portalId: "9",
    //   deviceId: "",
    //   pushId: "",
    //   redirect: false,
    // });
    // dispatch(loaderStatus(false));
    // console.log("resultresultresultresult", result);
    // if (result.error) {
    //   setMessage("Invalid Credentials");
    //   return false;
    // } else {
    //   // Redirect to the dashboard or home page
    //   window.location.href = "/dashboard";
    // }
  };

  return (
    <div className="flex justify-center h-screen items-center w-[calc(100%-400px)] relative z-10">
      <div className="p-12 bg-[#FFFEF9] mx-auto rounded-3xl w-[540px] shadow-[0px_4px_72px_9px_rgba(26,125,126,0.23)]">
        <div className="mb-7">
          {/* <h1 className="font-semibold text-2xl text-[#00000085] text-center">
          Recover Password
          </h1> */}
          <h2 className="font-bold text-4xl mt-8 mb-14 text-[#272746] text-center">
            Recover Password
          </h2>
        </div>
        {/* <form onSubmit={handleSubmit}> */}

        <div className="space-y-6">
          <div>
            <InputField
              labelClasses="text-base text-black font-normal"
              labelText="Username"
              fieldClasses="w-full text-sm mt-2 px-4 py-4 border border-[#8E8E8E] rounded-md bg-transparentt"
              fieldType="text"
              fieldValue={username}
              fieldPlaceholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <InputField
              labelClasses="text-base text-black font-normal"
              labelText="Email Address"
              fieldClasses="w-full text-sm mt-2 px-4 py-4 border border-[#8E8E8E] rounded-md bg-transparentt"
              fieldType="email"
              fieldValue={email}
              fieldPlaceholder="Enter Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mt-4">
            <InputField
              labelClasses="text-base text-black font-normal"
              labelText="Mobile Number"
              fieldClasses="w-full text-sm mt-2 px-4 py-4 border border-[#8E8E8E] rounded-md bg-transparent"
              fieldType="text"
              fieldValue={mobileNumber}
              fieldPlaceholder="Enter Mobile Number"
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#159D97] text-white font-medium text-base w-full flex justify-center p-x py-4 rounded-lg
                font-semibold shadow-[0_4px_19px_0_rgba(119, 147, 65, 0.3)] cursor-pointer"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div>
          <Link
                href="#"
                onClick={toggleRecoverPassword}
                className="text-[#8D8D8D] text-center text-base font-normal mt-4"
              >
                {" "}
                Back to Login
            </Link>
          </div>
          {/* <div>
            <p className="text-[#8D8D8D] text-center text-base font-normal mt-4">
              Back to login
              <Link
                href="#"
                onClick={toggleForm}
                className="underline text-[#1B9993]"
              >
                {" "}
                Sign up
              </Link>
            </p>
          </div> */}
        </div>
        <p className="text-red-500 mt-2">{message}</p>
      </div>

      <CopyRight />
    </div>
  );
}
