import React from "react";
import Image from "next/image";
import Link from "next/link";

const LeftSidebar = () => {
  return (
    <div className="fixed z-10 h-[100vh] w-[15%] left-0 bg-transparent min-w-[320px] pl-2">
      <Link
        href={"/hehe"}
        className="flex items-center gap-2 w-full min-h-12 mt-20 hover:bg-brown-opacity rounded-md"
      >
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
        <p className="font-bold">Kiều Linh</p>
      </Link>
      <Link
        href={"/hehe"}
        className="flex items-center gap-2 w-full min-h-12 hover:bg-brown-opacity rounded-md"
      >
        <div className="w-[55px] h-[55px] flex items-center justify-center">
          <i className="fa-solid fa-user-group text-[24px] text-brown-dark"></i>
        </div>
        <p className="font-bold">Bạn bè</p>
      </Link>
      <Link
        href={"/hehe"}
        className="flex items-center gap-2 w-full min-h-12 hover:bg-brown-opacity rounded-md"
      >
        <div className="w-[55px] h-[55px] flex items-center justify-center">
          <i className="text-[24px] text-brown-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-9"
            >
              <path
                fillRule="evenodd"
                d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                clipRule="evenodd"
              />
              <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
            </svg>
          </i>
        </div>
        <p className="font-bold">Nhóm</p>
      </Link>
      <Link
        href={"/hehe"}
        className="flex items-center gap-2 w-full min-h-12 hover:bg-brown-opacity rounded-md"
      >
        <div className="w-[55px] h-[55px] flex items-center justify-center">
          <i className="fa-solid fa-bookmark text-[24px] text-brown-dark"></i>
        </div>
        <p className="font-bold">Đã lưu</p>
      </Link>
      <Link
        href={"/hehe"}
        className="flex items-center gap-2 w-full min-h-12 hover:bg-brown-opacity rounded-md"
      >
        <div className="w-[55px] h-[55px] flex items-center justify-center">
          <i className="fa-solid fa-circle-play text-[24px] text-brown-dark"></i>
        </div>
        <p className="font-bold">Video</p>
      </Link>
    </div>
  );
};

export default LeftSidebar;