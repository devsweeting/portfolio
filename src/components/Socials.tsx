import React from "react";

export default function Socials() {
  return (
    <div className={`absolute bottom-10 left-8 z-50`}>
      <div className="flex justify-center gap-5 float-left flex-wrap">
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
      </div>
    </div>
  );
}

// border-2 border-sky-500
