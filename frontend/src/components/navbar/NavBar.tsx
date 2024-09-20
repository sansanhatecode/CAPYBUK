import React from "react";
import Image from "next/image";
import NavIcon from "../common/NavIcon";

const NavBar = () => {
  const links = [
    {
      href: "/",
      iconClass: "fa-solid fa-house",
    },
    {
      href: "/play",
      iconClass: "fa-solid fa-circle-play",
    },
    {
      href: "/store",
      iconClass: "fa-solid fa-store",
    },
    {
      href: "/game",
      iconClass: "fa-solid fa-gamepad",
    },
  ];

  return (
    <nav className="w-full bg-[#C5A27C] fixed z-20 top-0 flex justify-between min-h-[55px] items-center px-4">
      <div className="flex justify-start items-center gap-3 w-[20%]">
        <Image
          src="/assets/img/capubuk-logo.png"
          alt="capybuk logo"
          width="55"
          height="55"
          priority
        ></Image>
        <div className="bg-[#FFE7DA] w-[240px] h-[35px] flex justify-start items-center rounded-3xl px-3 gap-4">
          <i className="fa-solid fa-magnifying-glass text-[20px] text-brown-dark"></i>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-[180px]"
          />
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {links.map((link, index) => (
          <NavIcon key={index} href={link.href} iconClass={link.iconClass} />
        ))}
      </div>
      <div className="flex justify-end gap-12 w-[20%]">
        <button>
          <i className="fa-solid fa-square-poll-horizontal text-[24px] text-brown-dark"></i>
        </button>
        <button>
          <i className="fa-brands fa-facebook-messenger text-[24px] text-brown-dark"></i>
        </button>
        <button>
          <i className="fa-solid fa-bell text-[24px] text-brown-dark"></i>
        </button>
        <button>
          <div className="w-[55px] h-[55px] flex items-center justify-center">
            <div className="w-11 h-11 rounded-full overflow-hidden border-brown-opacity border-2">
              <Image
                src="/assets/img/example-avatar.jpg"
                alt="capybuk logo"
                width="55"
                height="55"
                priority
                className="object-cover"
              ></Image>
            </div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
