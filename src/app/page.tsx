"use client";
import React from "react";
import { Suspense, useState, useEffect } from "react";
import { PageContainer } from "@/components/pageLayout";
import Title from "@/components/title";
import Demo3d from "./three";
import LoadingSpinner from "@/components/LoadingSpinner";
import Socials from "@/components/Socials";

export default function Home() {
  // DEV NOTE -- TEST
  // Sets a duration of 3 seconds to show the spinner on every page load
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* <PageContainer>
        <Title />
        <Suspense fallback={null}>
          <Demo3d />
        </Suspense>
      </PageContainer> */}

      <PageContainer>
        {!loading && <Title />}
        <Suspense fallback={null}>
          {loading ? <LoadingSpinner /> : <Demo3d />}
          {/* <Demo3d /> */}
        </Suspense>

        <Socials />
      </PageContainer>
    </>
  );
}
