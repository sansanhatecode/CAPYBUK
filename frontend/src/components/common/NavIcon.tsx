"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavIconProps {
  href: string;
  iconClass: string;
}

const NavIcon: React.FC<NavIconProps> = ({ href, iconClass }) => {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`px-14 h-full min-h-[55px] flex justify-center items-center ${
        isActive ? "text-brown-xlight border-b-2 border-brown-xlight " : "text-brown-dark hover:bg-brown-opacity rounded-md"
      }`}
    >
      <i className={`${iconClass} text-[24px]`}></i>
    </Link>
  );
};

export default NavIcon;

