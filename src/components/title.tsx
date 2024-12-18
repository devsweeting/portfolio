import React, { ReactNode } from "react";
import localFont from "next/font/local";

interface WrapperProps {
  children: ReactNode;
}

const libreBarcode = localFont({
  src: "../app/fonts/LibreBarcode128.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// border-2 border-red-200
export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div
      className={` absolute top-0 left-0 w-full sm:w-2/3 float-left p-8 z-50`}
    >
      {children}
    </div>
  );
};

export default function Title() {
  return (
    <Wrapper>
      <div className={`${libreBarcode.className} text-6xl bg-transparent`}>
        Devin Sweeting
      </div>
    </Wrapper>
  );
}
