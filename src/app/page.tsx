import React from "react";
import { Suspense } from "react";
import { PageContainer } from "@/components/pageLayout";
import Title from "@/components/title";
import Demo3d from "./three";

export default function Home() {
  return (
    <PageContainer>
      <Title />
      <Suspense fallback={null}>
        <Demo3d />
      </Suspense>
    </PageContainer>
  );
}
