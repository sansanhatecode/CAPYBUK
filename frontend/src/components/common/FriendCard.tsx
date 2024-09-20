import React from "react";

interface FriendCardProps {
  className?: string;
  name: string;
  imageSrc?: string;
  mutualFriends?: number;
}

const FriendCard = ({
  name,
  className,
  imageSrc,
  mutualFriends,
}: FriendCardProps) => {
  return (
    <div
      className={`absolute z-50 w-[400px] min-h-32 p-4 bg-brown-xlight flex-col gap-4 hidden border-brown-light border-[1px] rounded-2xl shadow-md group-hover:flex ${
        className ? className : ""
      }`}
    >
      <div className="flex gap-5">
        <div className="w-28 h-28 rounded-full overflow-hidden border-brown-xlight border-[1px]">
          <img
            src={imageSrc ? imageSrc : "/assets/img/example-avatar.jpg"}
            className="w-full h-full object-cover hover:opacity-95"
            alt="background image"
          />
        </div>
        <div className="flex flex-col gap-1 w-[60%]">
          <p className="font-bold text-2xl">{name}</p>
          <div className="flex gap-3">
            <div className="w-6 flex justify-center text-brown-light pt-1">
              <i className="fa-solid fa-user-group text-lg"></i>
            </div>
            <p>
              {mutualFriends} bạn chung bao gồm{" "}
              <span className="font-bold hover:underline">Kieu Linh</span> và{" "}
              <span className="font-bold hover:underline">San san</span>
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 flex justify-center text-brown-light">
              <i className="fa-solid fa-location-dot text-xl"></i>
            </div>
            <p>
              Từ <span className="font-bold">Kinh Môn</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="py-2 bg-brown-light rounded-md w-[40%] font-bold text-gray-800 hover:shadow-lg flex gap-2 justify-center items-center">
          <i className="fa-solid fa-user-check mb-1"></i>Bạn bè
        </button>
        <button className="py-2 bg-pastelblue-medium rounded-md w-[40%] font-bold text-gray-800 hover:shadow-lg flex gap-2 justify-center items-center">
          <i className="fa-brands fa-facebook-messenger mb-1"></i>Nhắn tin
        </button>
        <button className="py-2 bg-brown-light rounded-md w-[10%] font-bold text-gray-800 hover:shadow-lg">
          ...
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
