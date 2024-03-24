"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dateGenerator } from "@/hooks/dateGenerator";
import { trendingBlogProps } from "@/types/types";

export interface trendingBlogCardProps {
  trendingBlog: trendingBlogProps;
  index: number;
}

const TrendingBlogCard = ({ trendingBlog, index }: trendingBlogCardProps) => {
  const { _id, title, createdAt, author } = trendingBlog;
  return (
    <Link href={`/blog/${_id}`} className="flex gap-5 mb-8">
      <h1 className="blog-index">{index < 10 ? "0" + (index + 1) : index}</h1>
      <div>
        <div className="flex gap-2 items-center mb-7">
          <div className="w-8 h-8 relative rounded-full border border-grey overflow-hidden">
            <Image src={author?.image ? author.image : "/images/default_user.png"} fill alt="profile_image" className="rounded-full"/>
          </div>
          <p className="line-clamp-1">{author?.name}</p>
          <p className="min-w-fit">{dateGenerator(createdAt)}</p>
        </div>
        <h1 className="blog-title">{title}</h1>
      </div>
    </Link>
  );
};

export default TrendingBlogCard;
