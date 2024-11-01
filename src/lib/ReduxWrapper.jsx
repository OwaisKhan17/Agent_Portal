// app/ReduxWrapper.jsx
"use client";
import { ReduxProvider } from "./store";

// This component is a client component

const ReduxWrapper = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default ReduxWrapper;
