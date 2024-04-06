"use client";

import React from "react";
import Image from "next/image";
import { dateGenerator } from "@/hooks/dateGenerator";
import { BsChatRightText, BsEye, BsHeart, BsHeartFill } from "react-icons/bs";
import Link from "next/link";


type blogCardProps = {
  _id: string;
  description: string;
  title: string;
  banner: { public_id: string; secure_url: string };
  tags: string[];
  likes?: string[];
  reads?: string[];
  totalReads: number
  totalComments: number
  totalLikes: number
  createdAt: string;
  author: {
    _id: string;
    name: string;
    image: string;
    profileImage: { public_id: string; secure_url: string };
    username: string;
  }
  likedPost?: boolean
}

const LatestBlogCard = ({ _id, title, author, createdAt, description, tags, likes, banner, likedPost, totalReads, totalComments}: blogCardProps) => {
  return (
    <Link href={`/blogs/${_id}`} className="flex gap-8 items-center border-b border-grey pb-5 mb-4">
      <div className="w-full dark:text-white">
        <div className="flex gap-2 items-center mb-7">
          <div className="w-10 h-10 relative rounded-full border border-grey dark:border-0 overflow-hidden">
            <Image src={author?.image ? author.image : "/images/default_user.png"} fill alt="profile_image" className="rounded-full"/>
          </div>
          <p className="line-clamp-1 hidden md:block">{author?.name} {author?.username}</p>
          <p className="line-clamp-1 md:hidden">{author?.name}</p>
          <p className="min-w-fit">{dateGenerator(createdAt)}</p>
        </div>
        <p className="blog-title">{title}</p>
        <p className="text-xl my-3 leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {description}
        </p>
        <div className="flex gap-4 mt-7">
          <span className="tag px-4">{tags[0]}</span>
          <div className="ml-3 flex items-center gap-2 text-dark-grey">
            {likedPost ? <BsHeartFill className="text-red"/> : <BsHeart className="" />}
            <p>{likes && likes.length}</p>
          </div>
          <div className="ml-3 flex items-center gap-2 text-dark-grey">
            <BsChatRightText className="" />
            <p>{totalComments}</p>
          </div>
          <div className="ml-3 flex items-center gap-2 text-dark-grey">
            <BsEye className="text-xl" />
            <p>{totalReads}</p>
          </div>
        </div>
      </div>
      <div className="md:h-32 h-28 aspect-square bg-grey rounded relative">
        <Image fill alt="banner" src={banner.secure_url} className="rounded" />
      </div>
    </Link>
  );
};

export default LatestBlogCard;
