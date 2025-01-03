"use client";
import React from "react";
import { Suspense } from "react";
import { PageContainer } from "@/components/pageLayout";
import Title from "@/components/title";
import Spheres from "./three";
import LoadingSpinner from "@/components/LoadingSpinner";
import Socials from "@/components/Socials";
import { Leva } from "leva";
import useIsMobile from "./utils/useIsMobile";
import { useLocalBlobControls } from "./utils/useLocalBlobControls";

export default function Home() {
  const { image, outlines, color, background, brightness } =
    useLocalBlobControls();

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
            sphereColor={color}
            image={image}
            outlines={outlines}
            // isMobile={isMobile}
          />
        </Suspense>
      </PageContainer>
    </>
  );
}
