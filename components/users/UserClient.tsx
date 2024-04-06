"use client";

import { latestBlogProps, userProps } from "@/types/types";
import React from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import Loader from "../common/Loader";
import Image from "next/image";
import Link from "next/link";
import AboutUser from "./AboutUser";
import WithinPageNavigation from "../common/WithinNavigation";
import LoadMoreSearchItem from "../search/LoadMoreSearchItems";
import NoBlogPostMessage from "../home/NoBlogPostMessage";
import LatestBlogs from "../home/LatestBlogs";
import { fetchUserBlogPosts } from "@/libs/actions/user.action";

export interface userClientProps {
  userId: string;
  currentUser: safeUser;
  pageUser: safeUser
}

export interface blogsProps {
  data: latestBlogProps[];
  blogCount: number;
  page: number;
}

type safeUser = Omit<userProps, "hashedPassword">;

const UserClient = ({ userId, currentUser, pageUser }: userClientProps) => {
  const [userBlogs, setUserBlogs] = React.useState<blogsProps | null>(null);
  const [moreUserBlogs, setMoreUserBlogs] = React.useState<blogsProps | null>(null);

  const routes = ["Blogs Published", "About"];
  const hidden = ["About"];

  const getUserBlogs = React.useCallback(async({ page = 1 }: { page: number }) => {
      try {
        await fetchUserBlogPosts({ userId: userId, page: page })
        .then((data) => setUserBlogs(data));
      } catch (error) {
        console.log(error)
      }
    },
    [userId]
  );

  const getMoreUserBlogs = React.useCallback(async({ page }: { page: number }) => {
      try {
        await fetchUserBlogPosts({ userId: userId, page: page })
        .then((data) => setMoreUserBlogs(data));
      } catch (error) {
        console.log(error)
      }
    },
    [userId]
  );

  React.useEffect(() => {
    if (userId) {
      getUserBlogs({ page: 1 });
    }
  }, [getUserBlogs, userId]);

  React.useEffect(() => {
    if (moreUserBlogs !== null && userBlogs !== null) {
      setUserBlogs({
        ...userBlogs,
        data: [...userBlogs.data, ...moreUserBlogs.data],
        page: moreUserBlogs.page,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moreUserBlogs]);

  return (
    <AnimationWrapper>
        <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[100px]:gap-12 dark:text-white">
          <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] md:w-[50%] md:pl-8 md:border-l border-grey md:stick md:top-[100px] md:py-10">
            <div className="relative w-48 h-48 md:w-32 md:h-32 bg-grey rounded-full overflow-hidden flex items-center justify-center">
              <Image src={pageUser.image ? pageUser.image : "/images/default_user.png"} alt="profile_img"fill/>
            </div>
            <h1 className="text-2xl font-medium">{pageUser.username}</h1>
            <p className="text-xl capitalize">{pageUser.name}</p>
            <p>{pageUser.totalBlogs.toLocaleString()} Blogs -{" "} {pageUser.totalReads.toLocaleString()} Reads</p>
            {currentUser._id === userId && (
              <div className="flex gap-4 mt-2">
                <Link href="/editprofile" className="btn-light rounded-full dark:text-black">
                  Edit Profile
                </Link>
              </div>
            )}
            <AboutUser
              bio={pageUser.bio}
              facebook={pageUser.facebook}
              instagram={pageUser.instagram}
              website={pageUser.website}
              youtube={pageUser.youtube}
              twitter={pageUser.twitter}
              github={pageUser.github}
              createdAt={pageUser.createdAt}
              className="max-md:hidden"
            />
          </div>

          <div className="max-md:mt-12 w-full">
            <WithinPageNavigation routes={routes} defaultHidden={hidden} defaultActiveIndex={0}>
              <React.Fragment>
                {userBlogs === null ? (
                  <Loader />
                ) : userBlogs.data.length ? (
                  <LatestBlogs latestBlogs={userBlogs.data} currentUserId={currentUser._id} />
                ) : (
                  <NoBlogPostMessage message={"No Published posts yet"} />
                )}
                <LoadMoreSearchItem currentData={userBlogs} getMoreSearchItems={getMoreUserBlogs} />
              </React.Fragment>

              <AboutUser
                bio={pageUser.bio}
                facebook={pageUser.facebook}
                instagram={pageUser.instagram}
                website={pageUser.website}
                youtube={pageUser.youtube}
                twitter={pageUser.twitter}
                github={pageUser.github}
                createdAt={pageUser.updatedAt}
              />
            </WithinPageNavigation>
          </div>
        </section>
    </AnimationWrapper>
  );
};

export default UserClient;
