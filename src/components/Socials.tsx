import useIsMobile from "@/app/utils/useIsMobile";
import React, { useState, useEffect } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <div
          className={`absolute bottom-5 left-1/2 transform -translate-x-1/2 z-50 flex gap-5 w-full`}
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
interface SocialsProps {
  onOpenModal: () => void;
}

export default function Socials({ onOpenModal }: SocialsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <button
        onClick={onOpenModal}
        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
      >
        <img src="images/fingerprint.svg" alt="Fingerprint" />
      </button>
    </Wrapper>
  );
}
