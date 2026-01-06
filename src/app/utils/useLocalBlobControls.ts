"use client";
import { useControls, button } from "leva";
import { useEffect } from "react";

// Default values constant
const DEFAULTS = {
  image: "/images/cross.jpg",
  outlines: 0.0,
  polish: 0.5,
  color: "#ffffff",
  background: "#dfdfdf",
  brightness: 0.5,
};

type ControlDefinition =
  | {
      label: string;
      options: Record<string, string | number>;
      value: string | number;
    }
  | {
      label: string;
      value: number;
      step: number;
      min: number;
      max: number;
    };

type ControlDefinitions = Record<string, ControlDefinition>;

const getInitialValue = (
  label: string,
  defaultValue: string | number
): string | number => {
  if (typeof window === "undefined") return defaultValue;

  try {
    const stored = localStorage.getItem(label);
    if (stored !== null) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Error reading ${label} from localStorage:`, error);
  }
  return defaultValue;
};

const clearAllSettings = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("Image");
    localStorage.removeItem("Outlines");
    localStorage.removeItem("Polish");
    localStorage.removeItem("Color");
    localStorage.removeItem("Background");
    localStorage.removeItem("Brightness");
  }
};

export const useLocalBlobControls = (): {
  image: string;
  outlines: number;
  polish: number;
  color: string;
  background: string;
  brightness: number;
} => {
  // Get initial values from localStorage
  const initialImage = getInitialValue("Image", DEFAULTS.image) as string;
  const initialOutlines = getInitialValue(
    "Outlines",
    DEFAULTS.outlines
  ) as number;
  const initialPolish = getInitialValue("Polish", DEFAULTS.polish) as number;
  const initialColor = getInitialValue("Color", DEFAULTS.color) as string;
  const initialBackground = getInitialValue(
    "Background",
    DEFAULTS.background
  ) as string;
  const initialBrightness = getInitialValue(
    "Brightness",
    DEFAULTS.brightness
  ) as number;

  // Define controls with initial values from localStorage
  const [controls, set] = useControls(() => ({
    image: {
      label: "Image",
      options: {
        Blackberry: "/images/blackberry.png",
        Cross: "/images/cross.jpg",
        "My Cat": "/images/mycat.png",
      },
      value: initialImage,
    },
    outlines: {
      label: "Outlines",
      value: initialOutlines,
      step: 0.01,
      min: 0,
      max: 0.05,
    },
    polish: {
      label: "Polish",
      options: {
        Chrome: 0,
        Glossy: 0.5,
        Matte: 1,
      },
      value: initialPolish,
    },
    color: {
      label: "Color",
      options: {
        White: "#ffffff",
        Red: "#EF1F14",
        Green: "#2FF44F",
        Blue: "#2048DB",
        Yellow: "#FAF436",
        Purple: "#D212E1",
      },
      value: initialColor,
    },
    background: {
      label: "Background",
      options: {
        White: "#dfdfdf",
        Red: "#F0605D",
        Green: "#73F587",
        Blue: "#7991DB",
        Yellow: "#FAF24F",
        Purple: "#D148E1",
      },
      value: initialBackground,
    },
    brightness: {
      label: "Brightness",
      value: initialBrightness,
      step: 0.5,
      min: 0,
      max: 2.5,
    },
    "Reset to Defaults": button(() => {
      // Clear localStorage
      clearAllSettings();

      // Reset all controls to default values
      set({
        image: DEFAULTS.image,
        outlines: DEFAULTS.outlines,
        polish: DEFAULTS.polish,
        color: DEFAULTS.color,
        background: DEFAULTS.background,
        brightness: DEFAULTS.brightness,
      });
    }),
  }));

  const { image, outlines, polish, color, background, brightness } = controls;

  // Save to localStorage whenever values change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("Image", JSON.stringify(image));
    }
  }, [image]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("Outlines", JSON.stringify(outlines));
    }
  }, [outlines]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("Polish", JSON.stringify(polish));
    }
  }, [polish]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("Color", JSON.stringify(color));
    }
  }, [color]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("Background", JSON.stringify(background));
    }
  }, [background]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("Brightness", JSON.stringify(brightness));
    }
  }, [brightness]);

  return { image, outlines, polish, color, background, brightness };
};
