import React from "react";
import Avatar from "./Avatar";

const Posting = () => {
  return (
    <div className="bg-brown-xlight rounded-md w-full p-3 shadow-md">
      <div className="w-full flex justify-between items-center pb-3 border-b-[1px] border-brown-light">
        <Avatar />
        <input
          type="text"
          placeholder="Bạn đang nghĩ gì?"
          className="p-3 h-9 rounded-full"
          style={{ width: 'calc(100% - 55px)' }}
        />
      </div>
      <div className="w-full flex justify-between items-center pt-3 gap-3">
        <button className="font-bold text-md rounded-md flex items-center justify-center hover:bg-brown-light py-2 w-1/3">
          <i className="fa-solid fa-video mr-2 text-xl text-red-500"></i>Video trực tiếp
        </button>
        <button className="font-bold text-md rounded-md flex items-center justify-center hover:bg-brown-light py-2 w-1/3">
          <i className="fa-regular fa-image mr-2 text-2xl text-green-600"></i>Ảnh/video
        </button>
        <button className="font-bold text-md rounded-md flex items-center justify-center hover:bg-brown-light py-2 w-1/3">
          <i className="fa-solid fa-flag mr-2 text-xl text-blue-600"></i>Sự kiện trong đời
        </button>
      </div>
    </div>
  );
};

export default Posting;
