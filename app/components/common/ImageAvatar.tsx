import Image from "next/image";
import React from "react";

interface imageAvatarProps {
  image?: string;
  onClick?: () => void;
}

const ImageAvatar = ({ image, onClick }: imageAvatarProps) => {
  return (
    <button
      className=" relative w-12 h-12 overflow-hidden bg-grey rounded-full hover:bg-black/20"
      onClick={onClick}
    >
      <Image
        src={image ? image : "/images/default_user.png"}
        alt="profile_avatar"
        fill
        className="rounded-full"
      />
    </button>
  );
};

export default ImageAvatar;
