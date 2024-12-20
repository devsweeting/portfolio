import useIsMobile from "@/app/utils/useIsMobile";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <div
          className={`absolute bottom-5 left-1/2 transform -translate-x-1/2 z-50 flex gap-5`}
        >
          {children}
        </div>
      ) : (
        <div
          className={`absolute bottom-10 left-8 z-50 flex justify-center gap-5 float-left flex-wrap`}
        >
          {children}
        </div>
      )}
    </>
  );
};

// border-2 border-sky-500

export default function Socials() {
  return (
    <Wrapper>
      <a
        href="https://www.linkedin.com/in/devinsweeting/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="images/linkedin.svg" alt="LinkedIn" />
      </a>
      <a
        href="https://www.instagram.com/dev_sweets/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="images/instagram.svg" alt="Instagram" />
      </a>
      <a
        href="https://x.com/wholly_ravioli"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="images/twitter.svg" alt="Twitter" />
      </a>
      <a
        href="https://github.com/devsweeting"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="images/github.svg" alt="GitHub" />
      </a>
      <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="images/fingerprint.svg" alt="Fingerprint" />
      </a>
    </Wrapper>
  );
}
