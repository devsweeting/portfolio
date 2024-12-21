import { useState, useEffect } from "react";
// useLayoutEffect
// import { debounce } from "lodash";

// const BREAKPOINT = 768;
// const useIsMobile = (): boolean => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= BREAKPOINT);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [BREAKPOINT]);

//   return isMobile;
// };

// export default useIsMobile;

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize: () => void = () => {
        setIsMobile(window.innerWidth <= breakpoint);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
