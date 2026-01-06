"use client";
import React, { useState } from "react";
import { Suspense } from "react";
import { PageContainer } from "@/components/pageLayout";
import Title from "@/components/title";
import Spheres from "./three";
import LoadingSpinner from "@/components/LoadingSpinner";
import Socials from "@/components/Socials";
import { Leva } from "leva";
import useIsMobile from "./utils/useIsMobile";
import { useLocalBlobControls } from "./utils/useLocalBlobControls";
import PortfolioModal from "@/components/PortfolioModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { image, outlines, color, background, brightness, polish } =
    useLocalBlobControls();

  console.log("image: ", image);
  console.log("outlines: ", outlines);
  console.log("color: ", color);
  console.log("background: ", background);
  console.log("brightness: ", brightness);
  console.log("polish: ", polish);

  const isMobile = useIsMobile();

  return (
    <>
      <PageContainer>
        {isMobile ? <Leva fill flat collapsed={true} /> : <Leva />}
        {/* DEV NOTE : keep for later */}
        {/* <Leva fill={isMobile} flat={isMobile} collapsed={isMobile} /> */}
        <Title />
        <Socials onOpenModal={() => setIsModalOpen(true)} />

        <Suspense fallback={<LoadingSpinner />}>
          <Spheres
            background={background}
            brightness={brightness}
            sphereColor={color}
            image={image}
            outlines={outlines}
            reflectLevel={polish}
          />
        </Suspense>
      </PageContainer>

      <PortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
