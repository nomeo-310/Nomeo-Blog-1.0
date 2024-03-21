import React from "react";
import MainNavigation from "@/app/app-components/Navigation";
import HomeClient from "@/components/home/HomeClient";
import { Metadata } from "next";
import {
  getLatestBlogPosts,
  getTrendingBlogPosts,
} from "@/libs/actions/blog.action";

export const metadata: Metadata = {
  title: "Nomeo Blog 1.0 | Home",
  description: "Generated by create next app",
};

export default async function Home() {
  const latestBlogPosts = await getLatestBlogPosts();
  const trendingBlogPosts = await getTrendingBlogPosts();

  if (!latestBlogPosts) {
    return null;
  }

  if (!trendingBlogPosts) {
    return null;
  }


  const plainBlogPosts = JSON.parse(JSON.stringify(latestBlogPosts));
  const plainTrendingPosts = JSON.parse(JSON.stringify(trendingBlogPosts));

  return (
    <React.Fragment>
      <MainNavigation />
      <HomeClient latestBlogs={plainBlogPosts} trendingBlogs={plainTrendingPosts}/>
    </React.Fragment>
  );
}
