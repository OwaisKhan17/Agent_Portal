// components/SessionTimeout.js
import { useEffect, useState, useCallback } from "react";
import { signOut } from "next-auth/react";

const SessionTimeout = ({ timeout }) => {
  const [timeLeft, setTimeLeft] = useState(timeout);

  const resetTimer = useCallback(() => {
    setTimeLeft(timeout);
  }, [timeout]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      clearInterval(countdown);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [resetTimer]);

  const handleTimeout = () => {
    signOut();
  };

  return (
    <div>
      <span>Session expires in: {timeLeft} seconds</span>
    </div>
  );
};

export default SessionTimeout;
