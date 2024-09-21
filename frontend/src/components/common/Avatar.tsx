import React from "react";
import Image from "next/image";

const Avatar = () => {
  return (
    <div className="w-11 h-11 rounded-full overflow-hidden border-brown-opacity border-2">
      <Image
        src="/assets/img/example-avatar.jpg"
        alt="avatar"
        width="55"
        height="55"
        priority
        className="object-cover"
      ></Image>
    </div>
  );
};

export default Avatar;
