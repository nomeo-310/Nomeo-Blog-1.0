import Image from "next/image";
import React from "react";

interface imageAvatarProps {
  image?: string;
  size?: string;
  onClick?: () => void;
}

const ImageAvatar = ({ image, onClick, size }: imageAvatarProps) => {
  return (
    <div className="w-fit">
      <button className={"relative overflow-hidden bg-grey rounded-full hover:bg-black/20 " + ( size === 'small' ? "w-10 h-10" : "w-11 h-11 md:w-12 md:h-12" )} onClick={onClick}>
        <Image src={image ? image : "/images/default_user.png"} alt="profile_avatar" fill className="rounded-full w-full h-full" />
      </button>
    </div>
  );
};

export default ImageAvatar;
