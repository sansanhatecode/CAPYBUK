import NavBar from "@/components/navbar/NavBar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center items-center flex-col w-full min-h-[100vh]">
      <NavBar/>
      {children}
    </div>
  );
}
