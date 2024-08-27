import MainSection from "@/components/common/MainSection";
import LeftNavbar from "@/components/navbar/LeftNavbar";
import NavBar from "@/components/navbar/NavBar";
import RightNavbar from "@/components/navbar/RightNavbar";
import React from "react";

export default function Home() {
  return (
    <>
      <NavBar/>
      <LeftNavbar/>
      <RightNavbar/>
      <MainSection></MainSection>
    </>
  );
}
