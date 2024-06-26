import MainNavigation from "@/app/app-components/Navigation";
import BlogClient from "@/components/blog/BlogClient";
import { fetchSimilarBlogPosts, fetchSingleBlogPost } from "@/libs/actions/blog.action";
import { fetchBlogComments } from "@/libs/actions/comment.action";
import { getSession } from "@/libs/actions/data.action";
import { fetchCurrentUser } from "@/libs/actions/user.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Nomeo Blog 1.0 | Blog",
  description: "Generated by create next app",
};

const BlogPage = async ({ params }: { params: { id: string } }) => {

  const { id } = params;
  const currentUser = await fetchCurrentUser();
  const session = await getSession();
  const blog = await fetchSingleBlogPost({blogId: id})
  const similarBlogs = await fetchSimilarBlogPosts({blogId: id})
  const comments = await fetchBlogComments({blogId: id, isReply: false, page: 1})

  const loggedIn = session && session.user && session.user.email === currentUser.email;

  return (
    <React.Fragment>
      <MainNavigation/>
      <BlogClient blogId={id} currentUser={currentUser} loggedIn={loggedIn} similarBlogs={similarBlogs} blog={blog} comments={comments}/>
    </React.Fragment>
  );
};

export default BlogPage;
