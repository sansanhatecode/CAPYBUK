import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  url?: string;
}

const Avatar: React.FC<AvatarProps> = ({ url = "/assets/img/example-avatar.jpg" }) => {
  return (
    <div className="w-11 h-11 rounded-full overflow-hidden border-brown-opacity border-2">
      <Image
        src={url}
        alt="avatar"
        width={55}
        height={55}
        priority
        className="object-cover"
      />
    </div>
  );
};

export default Avatar;
