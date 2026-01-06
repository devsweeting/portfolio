import useIsMobile from "@/app/utils/useIsMobile";
import React, { useState, useEffect, useRef } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <div
          className={`absolute bottom-5 left-1/2 transform -translate-x-1/2 z-50 flex justify-around gap-5 w-full px-16`}
        >
          {children}
        </div>
      ) : (
        <div
          className={`absolute bottom-10 left-8 z-50 flex justify-center gap-8 float-left flex-wrap`}
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
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const messages = ["pet me", "meow", "click me", "rub my belly", "purrrr"];

  useEffect(() => {
    const interval = setInterval(() => {
      buttonRef.current?.classList.add("wiggle");
      setTimeout(() => {
        buttonRef.current?.classList.remove("wiggle");
      }, 500);

      // Cycle to next message
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
      <>
        <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }

        .wiggle {
          animation: wiggle 0.8s ease-in-out;
        }
      `}</style>

        <button
          ref={buttonRef}
          onClick={onOpenModal}
          className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded relative group"
        >
          <img src="images/funnycat.png" alt="Fingerprint" className="h-9" />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-700 whitespace-nowrap opacity-0 group-[.wiggle]:opacity-100 transition-opacity">
            {messages[currentMessageIndex]}
          </span>
        </button>
      </>
    </Wrapper>
  );
}
