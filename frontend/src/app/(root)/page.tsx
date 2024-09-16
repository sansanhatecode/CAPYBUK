import MainSection from "@/components/common/MainSection";
import LeftNavbar from "@/components/navbar/LeftNavbar";
import RightNavbar from "@/components/navbar/RightNavbar";
import React from "react";

export default function Home() {
  return (
    <>
      <LeftNavbar/>
      <RightNavbar/>
      <MainSection></MainSection>
    </>
  );
}
