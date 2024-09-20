import MainSection from "@/components/common/MainSection";
import LeftSidebar from "@/components/navbar/LeftSidebar";
import RightSidebar from "@/components/navbar/RightSidebar";
import React from "react";

export default function Home() {
  return (
    <>
      <LeftSidebar/>
      <RightSidebar/>
      <MainSection></MainSection>
    </>
  );
}
