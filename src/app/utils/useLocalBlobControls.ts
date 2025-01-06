"use client";
import { useControls } from "leva";

type ControlDefinition =
  | {
      label: string;
      options: Record<string, string>; // For dropdown controls
      value: string;
      onChange: (v: string) => void;
      transient: boolean;
    }
  | {
      label: string;
      value: number;
      step: number;
      min: number;
      max: number;
      onChange: (v: number) => void;
      transient: boolean;
    };

type ControlDefinitions = Record<string, ControlDefinition>;

let controlDefinitions: ControlDefinitions = {
  image: {
    label: "Image",
    options: {
      Blackberry: "/images/blackberry.png",
      Cross: "/images/cross.jpg",
      "My Cat": "/images/mycat.png",
    },
    value: "/images/cross.jpg",
    onChange: (v: string) => {
      localStorage.setItem("Image", JSON.stringify(v));
    },
    transient: false,
  },
  outlines: {
    label: "Outlines",
    value: 0.0,
    step: 0.01,
    min: 0,
    max: 0.05,
    onChange: (v: number) => {
      localStorage.setItem("Outlines", JSON.stringify(v));
    },
    transient: false,
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
    value: "#ffffff",
    onChange: (v: string) => {
      localStorage.setItem("Color", JSON.stringify(v));
    },
    transient: false,
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
    value: "#dfdfdf",
    onChange: (v: string) => {
      localStorage.setItem("Background", JSON.stringify(v));
    },
    transient: false,
  },
  brightness: {
    label: "Brightness",
    value: 0.5,
    step: 0.5,
    min: 0,
    max: 2.5,
    onChange: (v: number) => {
      localStorage.setItem("Brightness", JSON.stringify(v));
    },
    transient: false,
  },
};

export const useLocalBlobControls = (): {
  image: string;
  outlines: number;
  color: string;
  background: string;
  brightness: number;
} => {
  // Check if each label exists in localStorage
  if (typeof window === "undefined") {
    console.log("The window object is not available in this environment.");
  } else {
    console.log(window.localStorage); // This will throw an error on the server side
  }

  if (typeof window !== "undefined") {
    Object.values(controlDefinitions).forEach((control) => {
      const controlValueInStorage = localStorage.getItem(control.label);
      const existsInStorage = controlValueInStorage !== null;
      console.log(
        `Label "${control.label}" exists in localStorage: ${existsInStorage} -- ${controlValueInStorage}`
      );
      if (!existsInStorage) {
        localStorage.setItem(control.label, JSON.stringify(control.value));
      } else {
        // Set localStorage value to controlDefinitions
        const key: keyof ControlDefinitions =
          control.label.toLowerCase() as string;
        const definition = controlDefinitions[key];

        // Check and assign the value
        //   if (definition && typeof definition.value === "string") {
        //     console.log("Value is a string:", definition.value);
        //   } else {
        //     console.log("Value is not a string:", definition.value);
        //   }

        if (definition) {
          try {
            const parsedValue = JSON.parse(controlValueInStorage);
            // Ensure valid value type for outlines
            if (
              (control.label === "Outlines" ||
                control.label === "Brightness") &&
              typeof parsedValue !== "number"
            ) {
              throw new Error(
                `Invalid value type for "${control.label}". Expected a number.`
              );
            }

            definition.value = parsedValue;
          } catch (error) {
            console.error(`Error parsing value for "${control.label}":`, error);
          }
        } else {
          console.error(
            `Definition not found for label "${control.label.toLowerCase()}".`
          );
        }
      }
    });
  } else {
    console.error("The window object is not available in this environment.");
  }

  const schema = Object.keys(controlDefinitions).reduce((acc, key) => {
    const control = controlDefinitions[key];
    if ("options" in control) {
      acc[key] = {
        label: control.label,
        options: control.options,
        value: control.value,
      };
    } else {
      acc[key] = {
        label: control.label,
        value: control.value,
        step: control.step,
        min: control.min,
        max: control.max,
      };
    }
    return acc;
  }, {} as Record<string, any>);

  const { image, outlines, color, background, brightness } =
    useControls(schema);

  return { image, outlines, color, background, brightness };
};
