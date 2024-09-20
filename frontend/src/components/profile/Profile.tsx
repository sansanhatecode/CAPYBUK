"use client";

import React from "react";
import "./profile.css";
import FriendCard from "../common/FriendCard";
import { useParams, usePathname, useRouter } from "next/navigation";

type Button = {
  id: number;
  label: string;
  linkTo: string;
};

const Profile = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useParams();

  const buttons: Button[] = [
    { id: 1, label: "Bài viết", linkTo: `/${userId}` },
    { id: 2, label: "Giới thiệu", linkTo: `/${userId}/about` },
    { id: 3, label: "Bạn bè", linkTo: `/${userId}/friends` },
    { id: 4, label: "Ảnh", linkTo: `/${userId}/photos` },
    { id: 5, label: "Video", linkTo: `/${userId}/videos` },
    { id: 6, label: "Reels", linkTo: `/${userId}/reels` },
  ];
  const friends: number[] = [1, 2, 3, 4, 5, 6];

  return (
    <section className="w-full flex justify-center bg-gradient-to-b from-brown-opacity to-brown-xlight">
      <div className="w-[65%] pt-[55px] relative">
        <div className="w-full h-96 overflow-hidden rounded-b-lg cursor-pointer">
          <img
            src="/assets/img/example-avatar.jpg"
            className="w-full h-full object-cover hover:opacity-90"
            alt="background image"
          />
        </div>
        <div className="w-48 h-48 rounded-full overflow-hidden cursor-pointer border-brown-xlight border-4 absolute left-5 top-[380px] bg-brown-xlight">
          <img
            src="/assets/img/example-avatar.jpg"
            className="w-full h-full object-cover hover:opacity-90"
            alt="avatar"
          />
        </div>
        <div className="min-h-10 pl-60 pt-4 pb-9 flex flex-col mx-3 border-b-brown-light border-b-[1px]">
          <div className="flex gap-2">
            <h1>Kiều Linh</h1>{" "}
            <span className="text-2xl text-[#333]">(sansan)</span>
          </div>
          <p className="text-gray-400 hover:underline mb-1">298 người bạn</p>
          <div className="flex -space-x-[5px]">
            {friends.map((_, index) =>
              index === 5 ? (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full overflow-hidden border-brown-xlight border-[1px] relative cursor-pointer"
                  style={{ zIndex: friends.length - index }}
                  onClick={() => console.log("hehe")}
                >
                  <img
                    src="/assets/img/example-avatar.jpg"
                    className="w-full h-full object-cover opacity-70"
                    alt="background image"
                  />
                  <p className="font-bold text-brown-xlight absolute z-50 top-[1px] left-2">
                    ...
                  </p>
                </div>
              ) : (
                <div
                  key={index}
                  className="relative cursor-pointer group"
                  style={{ zIndex: friends.length - index }}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-brown-xlight border-[1px]">
                    <img
                      src="/assets/img/example-avatar.jpg"
                      className="w-full h-full object-cover"
                      alt="background image"
                    />
                  </div>
                  <FriendCard
                    className="translate-x-[-50%] left-4"
                    name="Nguyen Kieu Linh"
                    mutualFriends={20}
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex pt-1">
          <div>
            {buttons.map((button) => (
              <button
                key={button.id}
                className={`profile-button ${
                  pathname === button.linkTo
                  // pathname.startsWith(`${button.linkTo}/`)
                    ? "border-b-4 border-b-brown-medium text-gray-800"
                    : "rounded-md hover:bg-brown-light text-gray-600"
                }`}
                onClick={() => router.push(`${button.linkTo}`)}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
