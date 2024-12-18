import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const PageContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className={`w-full h-screen border-2 border-sky-500`}>{children}</div>
  );
};
