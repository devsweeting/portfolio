"use client";
import React from "react";
import { Suspense } from "react";
import { PageContainer } from "@/components/pageLayout";
import Title from "@/components/title";
import Spheres from "./three";
import LoadingSpinner from "@/components/LoadingSpinner";
import Socials from "@/components/Socials";
import { Leva, useControls } from "leva";
import useIsMobile from "./utils/useIsMobile";

export default function Home() {
  const { image, outlines, sphereColor, background, brightness } = useControls({
    image: {
      label: "Image",
      options: {
        Blackberry: "/images/blackberry.png",
        Cross: "/images/cross.jpg",
        "My Cat": "/images/mycat.png",
      },
      value: "/images/cross.jpg",
    },
    outlines: { label: "Outlines", value: 0.0, step: 0.01, min: 0, max: 0.05 },
    sphereColor: {
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
    },
    brightness: {
      label: "Brightness",
      value: 0.5,
      step: 0.5,
      min: 0,
      max: 2.5,
    },
  });

  const isMobile = useIsMobile();

  return (
    <>
      <PageContainer>
        {isMobile ? <Leva fill flat collapsed={true} /> : <Leva />}
        {/* <Leva fill={isMobile} flat={isMobile} collapsed={isMobile} /> */}
        <Title />
        <Socials />

        <Suspense fallback={<LoadingSpinner />}>
          <Spheres
            background={background}
            brightness={brightness}
            sphereColor={sphereColor}
            image={image}
            outlines={outlines}
            // isMobile={isMobile}
          />
        </Suspense>
      </PageContainer>
    </>
  );
}
