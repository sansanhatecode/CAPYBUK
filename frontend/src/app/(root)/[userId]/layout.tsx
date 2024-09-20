import Profile from "@/components/profile/Profile";
import React from "react";

const page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Profile />
      {children}
    </>
  );
};

export default page;
