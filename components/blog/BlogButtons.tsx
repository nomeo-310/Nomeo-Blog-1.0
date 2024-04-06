"use client";

import { likeBlogPost } from "@/libs/actions/blog.action";
import { BsHeart, BsHeartFill, BsChatRightText, BsTwitter, BsEye } from "react-icons/bs";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { plainBlog } from "./BlogClient";

type Props = {
  blog: plainBlog | null;
  userId: string;
  loggedIn: boolean | null | undefined
  toggleCommentSection: () => void
};

const BlogButtons = ({ blog, userId, loggedIn, toggleCommentSection }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const liked = blog?.likes.includes(userId);

  const [locationHref, setLoactionHref] = React.useState('')

  const likeCurrentBlog = async () => {
    if (loggedIn) {
      await likeBlogPost(blog?._id!, pathname)
      .then((response) => {
        if (response?.success) {
          router.refresh();
        }
      });
    } else {
      router.push(`/sign-in?next=${pathname}`)
    }
  };

  React.useEffect(() => {
    setLoactionHref(window.location.href)
  }, []);

  return (
    <React.Fragment>
      <hr className="border-grey my-2" />
      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <div className="flex gap-3 items-center">
            <button onClick={likeCurrentBlog} className={"w-10 h-10 rounded-full flex items-center justify-center " + (liked ? "bg-red/40 text-red" : "bg-grey/80 text-dark-grey")}>
              {liked ? (
                <BsHeartFill className="text-xl" />
              ) : (
                <BsHeart className="text-xl" />
              )}
            </button>
            <p className="text-xl text-dark-grey">{blog?.totalLikes}</p>
          </div>
          <div className="flex gap-3 items-center">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80 text-dark-grey" onClick={toggleCommentSection}>
              <BsChatRightText className="text-xl" />
            </button>
            <p className="text-xl text-dark-grey">{blog?.totalComments}</p>
          </div>
          <div className="flex gap-3 items-center">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80 text-dark-grey">
              <BsEye className="text-xl" />
            </button>
            <p className="text-xl text-dark-grey">{blog?.totalReads}</p>
          </div>
        </div>
        <div className="flex gap-6">
          <a href={`https://twitter.com/intent/tweet?text=Read ${blog?.title}&url=${locationHref}`} className="hover:text-[#1DA1F2]">
            <BsTwitter className="text-2xl" />
          </a>
        </div>
      </div>
      <hr className="border-grey my-2" />
    </React.Fragment>
  );
};

export default BlogButtons;
