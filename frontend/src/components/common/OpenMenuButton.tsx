"use client";
import React, { useState } from "react";
import Avatar from "./Avatar";

const OpenMenuButton = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <button
      className="w-[55px] h-[55px] flex items-center justify-center relative"
      onClick={() => setOpen(!open)}
    >
      <Avatar />
      {open && (
        <div className="w-80 bg-brown-xlight shadow-md absolute top-[55px] right-0 flex flex-col font-bold p-3">
          <button className="rounded-md hover:bg-brown-light flex gap-3 items-center border-b-[1px] border-brown-light">
            <Avatar />
            <p className="text-lg">Kieu Linh</p>
          </button>
          <button className="rounded-md hover:bg-brown-light flex gap-3 items-center">
            <p className="text-lg">Cài đặt & quyền riêng tư</p>
          </button>
          <button className="rounded-md hover:bg-brown-light flex gap-3 items-center">
            <p className="text-lg">Trợ giúp & hỗ trợ</p>
          </button>
          <button className="rounded-md hover:bg-brown-light flex gap-3 items-center">
            <p className="text-lg">Màn hình & trợ năng</p>
          </button>
          <button className="rounded-md hover:bg-brown-light flex gap-3 items-center">
            <p className="text-lg">Đóng góp ý kiến</p>
          </button>
          <button className="rounded-md hover:bg-brown-light flex gap-3 items-center">
            <p className="text-lg">Đăng xuất</p>
          </button>
        </div>
      )}
    </button>
  );
};

export default OpenMenuButton;
