"use client";

import React from "react";
import { latestBlogProps } from "./HomeClient";
import Image from "next/image";
import { dateGenerator } from "@/hooks/dateGenerator";
import { BsHeart } from "react-icons/bs";
import Link from "next/link";

const LatestBlogCard = ({ _id, title, author, createdAt, description, tags, likes, banner}: latestBlogProps) => {
  return (
    <Link href={`/blog/${_id}`} className="flex gap-8 items-center border-b border-grey pb-5 mb-4">
      <div className="w-full">
        <div className="flex gap-2 items-center mb-7">
          <div className="w-8 h-8 relative rounded-full border border-grey overflow-hidden">
            <Image src={author?.image ? author.image : "/images/default_user.png"} fill alt="profile_image" className="rounded-full"/>
          </div>
          <p className="line-clamp-1">
            {author?.name} {author?.username}
          </p>
          <p className="min-w-fit">{dateGenerator(createdAt)}</p>
        </div>
        <p className="blog-title">{title}</p>
        <p className="text-xl my-3 leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {description}
        </p>
        <div className="flex gap-4 mt-7">
          <span className="btn-light py-1 px-4">{tags[0]}</span>
          <div className="ml-3 flex items-center gap-2 text-dark-grey">
            <BsHeart className="" />
            <p>{likes.length}</p>
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
