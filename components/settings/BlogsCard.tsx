"use client";

import React from "react";
import { dateGenerator } from "@/hooks/dateGenerator";
import { BsChatRightText, BsEye, BsTrash3 } from "react-icons/bs";
import { deleteBlogPost } from "@/libs/actions/blog.action";
import { usePathname, useRouter } from "next/navigation";
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

const BlogsCard = ({ _id, title, author, createdAt, description, totalReads, totalComments}: blogCardProps) => {
  const pathname = usePathname();

  const handleDeleteBlog = React.useCallback(async(id:string) => {
    try {
      await deleteBlogPost({blogId:id, path: pathname})
      .then((response) => {
        if (response.success) {
          window.location.reload()
        }
      });
    } catch (error) {
      console.log(error)
    }
  }, [pathname]);

  return (
    <div className="flex gap-8 items-center border-b border-grey pb-5 mb-4">
      <div className="w-full dark:text-white">
        <div className="flex gap-2 items-center mb-7">
          <p className="line-clamp-1 hidden md:block">{author?.name} {author?.username}</p>
          <p className="line-clamp-1 md:hidden">{author?.name}</p>
          <p className="min-w-fit">{dateGenerator(createdAt)}</p>
        </div>
        <Link href={`/blogs/${_id}`} className="blog-title hover:underline">{title}</Link>
        <p className="text-xl my-3 leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 mt-7">
            <div className="ml-3 flex items-center gap-2 text-dark-grey">
              <BsChatRightText className="" />
              <p>{totalComments}</p>
            </div>
            <div className="ml-3 flex items-center gap-2 text-dark-grey">
              <BsEye className="text-xl" />
              <p>{totalReads}</p>
            </div>
          </div>
          <button className='p-2 rounded-full bg-red/40 hover:bg-red/50 active:bg-red/50 dark:text-white' onClick={() => handleDeleteBlog(_id)}>
            <BsTrash3 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
