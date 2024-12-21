import { useState, useLayoutEffect } from "react";

export default function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  //   runs synchronously after React has performed all DOM mutations but before the browser paints. This ensures the isMobile state is updated as early as possible, avoiding potential visual mismatches during the first render.
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setIsMobile(window.innerWidth < breakpoint);

      // Perform initial check
      handleResize();

      // Add event listener for resizing
      window.addEventListener("resize", handleResize);

      // Cleanup on unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [breakpoint]);

  return isMobile;
}
