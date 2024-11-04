import { useState, useRef, useEffect } from "react";
import CopyRight from "./copyRight/CopyRight";

export default function OTPComponent({ length = 6 }) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);
  const [message, setMessage] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  let customClass ="";

  const handleChange = (e, index) => {
    setMessage("");
    const { value } = e.target;

    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      setOtp(newOtp);

      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  // Check if all OTP fields are filled
  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP submitted:", otp.join(""));
    setMessage("OTP has been send successfully");
    setIsSubmitted(true);
    customClass = "text-green-500"
    startResendTimer();
  };

  const startResendTimer = () => {
    setIsResendDisabled(true);
    setTimer(60);

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex justify-center h-screen items-center w-[calc(100%-400px)] relative z-10">
      <div className="p-12 bg-[#FFFEF9] mx-auto rounded-3xl w-[540px] shadow-[0px_4px_72px_9px_rgba(26,125,126,0.23)]">
        <div className="mb-7">
          <h2 className="font-bold text-4xl mt-8 text-[#272746] text-center">
            OTP Code
          </h2>          
          <p className="font-medium text-xl mt-2 mb-20 text-[#272746] text-center">
            We have sent an OTP code to your registered <span className="font-extrabold">Email and Mobile number</span>
          </p>
        </div>

        <div className="space-y-6 mt-14 mb-20">
          <div className="flex justify-center">
            {otp.map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="text-3xl w-16 h-16 mx-1.5 text-center border-1 border-[#cccccc] rounded"
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputs.current[index] = el)}
              />
            ))}
          </div>

          {!isSubmitted ? (
            <div>
              <button
                type="submit"
                className={`text-white font-medium text-base w-full flex justify-center py-4 rounded-lg 
                  ${isOtpComplete ? 'bg-[#159D97]' : 'bg-gray-400 pointer-events-none'} 
                  font-semibold shadow-[0_4px_19px_0_rgba(119, 147, 65, 0.3)] cursor-pointer mt-20`}
                disabled={!isOtpComplete}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="mt-4 flex justify-center">
              <button
                className={`text-white font-medium text-base w-full flex justify-center py-4 rounded-lg mt-20 
                  ${isResendDisabled ? 'bg-gray-400 pointer-events-none' : 'bg-[#FF7F50]'} 
                  font-semibold shadow-[0_4px_19px_0_rgba(119, 147, 65, 0.3)] cursor-pointer`}
                disabled={isResendDisabled}
                onClick={() => {
                  console.log("Resending OTP...");
                  // Add your resend OTP logic here
                  startResendTimer();
                }}
              >
                {isResendDisabled ? `Resend in ${timer}s` : "Resend OTP"}
              </button>
            </div>
          )}
        </div>
        <p className={`mt-2 ${customClass}`}>{message}</p>
      </div>

      <CopyRight />
    </div>
  );
}
