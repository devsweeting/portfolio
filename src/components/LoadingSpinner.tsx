"use client";
import React from "react";
import { DotLoader } from "react-spinners";
// https://www.davidhu.io/react-spinners/

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#000000]">
      <DotLoader color="#ffffff" size={50} loading />
    </div>
  );
};

// bg-gradient-to-r from-blue-500 to-purple-600

export default LoadingSpinner;
