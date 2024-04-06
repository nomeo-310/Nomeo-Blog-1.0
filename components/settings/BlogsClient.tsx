"use client";

import React from "react";
import { blogsProps } from "../home/HomeClient";
import { useRouter } from "next/navigation";
import { fetchUserBlogPosts } from "@/libs/actions/user.action";
import Loader from "../common/Loader";
import NoBlogPostMessage from "../home/NoBlogPostMessage";
import AllBlogs from "./AllBlogs";
import LoadMoreBlogs from "./LoadMoreBlogs";
import { BsSearch } from "react-icons/bs";

type Props = {
  userId: string;
};

const BlogsClient = ({ userId }: Props) => {
  const [blogs, setBlogs] = React.useState<blogsProps | null>(null);
  const [moreBlogs, setMoreBlogs] = React.useState<blogsProps | null>(null);
  const [query, setQuery] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('')

  const router = useRouter();

  const createSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (!event.target.value) {
      setSearchQuery('');
      setBlogs(null);
    }

    let queryText = event.target;
    setQuery(queryText.value);
  }

  const handleKeyDown = async(event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.length > 0) {
      event.preventDefault();
      setBlogs(null);
      setSearchQuery(query)
    }
  };

  const getBlogs = React.useCallback(
    async ({ page = 1 }: { page: number }) => {
      try {
        await fetchUserBlogPosts({ page: page, userId: userId, queryText: searchQuery }).then(
          async (data) => {
            setBlogs(data);
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    [searchQuery, userId]
  );

  React.useEffect(() => {
    getBlogs({ page: 1 });
  }, [getBlogs]);

  const getMoreBlogs = React.useCallback(
    async ({ page }: { page: number }) => {
      try {
        await fetchUserBlogPosts({ page: page, userId: userId, queryText: searchQuery }).then(
          async (data) => {
            setMoreBlogs(data);
            router.refresh();
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    [searchQuery, router, userId]
  );

  React.useEffect(() => {
    if (moreBlogs !== null && blogs !== null) {
      setBlogs({
        ...blogs,
        data: [...blogs.data, ...moreBlogs.data],
        page: moreBlogs.page,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moreBlogs]);

  React.useEffect(() => {
    if (blogs === null) {
      getBlogs({ page: 1 });
    }
  }, [blogs, getBlogs]);

  return (
    <React.Fragment>
      <h1 className="dark:text-grey">Manage blogs</h1>
      <div className="relative max-md:mt-5 md:mt-8 mb-10">
        <input type="text" className="w-full bg-grey p-4 pr-6 pl-12 rounded-full placeholder:text-dark-grey" placeholder="search blogs..."
          onKeyDown={handleKeyDown}
          value={query}
          onChange={createSearchQuery}/>
        <BsSearch className="text-xl absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 text-dark-grey -translate-y-1/2" />
      </div>

      {blogs === null ? (
        <Loader />
      ) : blogs.data.length ? (
        <AllBlogs latestBlogs={blogs.data} currentUserId={userId} />
      ) : (
        <NoBlogPostMessage message="No blog posts published yet" />
      )}
      <LoadMoreBlogs currentData={blogs} getMoreBlogs={getMoreBlogs} />
    </React.Fragment>
  );
};

export default BlogsClient;
