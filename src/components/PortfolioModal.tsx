import useIsMobile from "@/app/utils/useIsMobile";
import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex ${
        isMobile ? "items-end" : "items-center justify-center"
      } transition-all duration-300 ${
        isVisible
          ? "bg-black bg-opacity-75 backdrop-blur-md"
          : "bg-black bg-opacity-0 backdrop-blur-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-gray-900 shadow-2xl w-full transition-all duration-300 transform ${
          isMobile
            ? `rounded-t-3xl max-h-[90vh] overflow-y-auto p-8 ${
                isVisible ? "translate-y-0" : "translate-y-full"
              }`
            : `rounded-2xl max-w-3xl mx-4 p-8 md:p-10 max-h-[85vh] overflow-y-auto ${
                isVisible
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-4"
              }`
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-0 float-right text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Hi Stranger!
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
              Welcome to my Portfolio
            </h2>
          </div>

          {/* Main content */}
          <div className="space-y-5 text-gray-300 leading-relaxed">
            <p>
              My name is Devin Sweeting and let&apos;s be honest, a portfolio
              that&apos;s just a neatly organized list of accomplishments
              isn&apos;t exactly exciting. This page isn&apos;t about checking
              boxes; it&apos;s about showing how I think, build, and experiment.
            </p>

            <p>
              I created this site as a space to show a little personality. Why
              tell you what I can do when I can show you instead? From the
              visuals to the interactions, everything here is intentional—built
              to be explored, clicked, dragged, and occasionally broken.
            </p>

            <p>
              Below you&apos;ll find links to other websites and projects
              I&apos;ve worked on. Each one represents a different idea,
              problem, or experiment I wanted to chase down.
            </p>

            <p>
              So go ahead—play with the interactive elements. Change the
              settings, toss things around, stress-test it a little.
            </p>
          </div>

          {/* Links Section */}
          <div className="pt-6 border-t border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Past Projects
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="https://sweetingdev.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-base md:text-lg inline-flex items-center group"
                >
                  3D Portfolio — Curated WebGL & 3D modeling showcase
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://ridereport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-base md:text-lg inline-flex items-center group"
                >
                  Ride Report Marketing Site — HubSpot-powered marketing &
                  internal app support
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://public.ridereport.com/pdx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-base md:text-lg inline-flex items-center group"
                >
                  Ride Report Open Data Portal — React-based city data
                  visualization platform
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://protalus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-base md:text-lg inline-flex items-center group"
                >
                  Protalus Shopify Store — Performance-focused Shopify rebuild
                  using Liquid
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://blackberridesign.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-base md:text-lg inline-flex items-center group"
                >
                  BlackBerri Design — Fully custom Shopify theme for design
                  retailer
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://rcjpdx.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-base md:text-lg inline-flex items-center group"
                >
                  Rose City Justice — WordPress site for local social justice
                  initiatives
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://jump.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-base md:text-lg inline-flex items-center group"
                >
                  JumpCo — Pre-launch blockchain transaction app MVP
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://thefiredjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-base md:text-lg inline-flex items-center group"
                >
                  The Fire DJs — Ongoing WordPress support for DJ booking
                  platform
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
