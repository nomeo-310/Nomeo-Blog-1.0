"use client";

import React from "react";
import WithinPageNavigation from "../common/WithinNavigation";
import Loader from "../common/Loader";
import LatestBlogs from "../home/LatestBlogs";
import NoBlogPostMessage from "../home/NoBlogPostMessage";
import { latestBlogProps } from "@/types/types";
import LoadMoreSearchItem from "./LoadMoreSearchItems";
import SearchedUsers from "./SearchedUsers";
import { BsPerson } from "react-icons/bs";
import { fetchSearchItems } from "@/libs/actions/blog.action";
import { usePathname } from "next/navigation";
import { fetchSearchedUsers } from "@/libs/actions/user.action";

type Props = {
  id: string;
};

export interface blogsProps {
  data: latestBlogProps[];
  blogCount: number;
  page: number;
}

export interface searchedUser {
  _id: string;
  name: string;
  username: string;
  image: string;
  profileImage: { public_id: string; secure_url: string };
}

export interface usersProps {
  data: searchedUser[];
  userCount: number;
  page: number;
}

const SearchClient = ({ id }: Props) => {
  const pathname = usePathname();
  const routes = [`Search results from "${id}"`, "Account marched"];
  const hidden = ["Account marched"];

  const [blogs, setBlogs] = React.useState<blogsProps | null>(null);
  const [users, setUsers] = React.useState<usersProps | null>(null);
  const [moreBlogs, setMoreBlogs] = React.useState<blogsProps | null>(null);

  const getSearchItems = React.useCallback(async({ page = 1 }: { page: number }) => {
    try {
      await fetchSearchItems({ query: id, page: page, path: pathname })
        .then(async (data) => {setBlogs(data)});
    } catch (error) {
      console.log(error);
    }
  }, [id, pathname]);

  const getMoreSearchItems = React.useCallback(async({ page }: { page: number }) => {
      try {
        await fetchSearchItems({ query: id, page: page, path: pathname })
          .then((data ) => {setMoreBlogs(data)});
      } catch (error) {
        console.log(error);
      }
    },
    [id, pathname]
  );

  const getSearchUsers = React.useCallback(async() => {
    try {
      await fetchSearchedUsers({query: id, path: pathname})
        .then(async (data ) => {setUsers(data)});
    } catch (error) {
      console.log(error);
    }
  }, [id, pathname]);

  const resetData = () => {
    setBlogs(null);
    setUsers(null);
  };

  React.useEffect(() => {
    resetData();
    getSearchItems({ page: 1 });
    getSearchUsers();
  }, [getSearchItems, getSearchUsers]);

  React.useEffect(() => {
    if (moreBlogs !== null && blogs !== null) {
      setBlogs({...blogs, data: [...blogs.data, ...moreBlogs.data],page: moreBlogs.page});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moreBlogs]);

  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <WithinPageNavigation routes={routes} defaultHidden={hidden} defaultActiveIndex={0}>
          <React.Fragment>
            {blogs === null ? (
              <Loader />
            ) : blogs.data.length ? (
              <LatestBlogs latestBlogs={blogs.data} />
            ) : (
              <NoBlogPostMessage
                message={`No result from the search for "${id}"`}
              />
            )}
            <LoadMoreSearchItem currentData={blogs} getMoreSearchItems={getMoreSearchItems}/>
          </React.Fragment>
          <React.Fragment>
            {users === null ? (
              <Loader />
            ) : users.data.length ? (
              <SearchedUsers users={users.data} />
            ) : (
              <NoBlogPostMessage
                message={`No result from the search for "${id}"`}
              />
            )}
          </React.Fragment>
        </WithinPageNavigation>
      </div>
      <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <h1 className="font-medium text-xl">User related to search</h1>
            <BsPerson className="text-xl" />
          </div>
          <React.Fragment>
            {users === null ? (
              <Loader />
            ) : users.data.length ? (
              <SearchedUsers users={users.data} />
            ) : (
              <NoBlogPostMessage message="No user found" />
            )}
          </React.Fragment>
        </div>
      </div>
    </section>
  );
};

export default SearchClient;
