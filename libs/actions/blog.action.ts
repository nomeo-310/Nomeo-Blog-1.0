"use server"

import { OutputData } from "@editorjs/editorjs";
import connectToDatabase from "../utils/connectDatabase";
import { getSession, getUserByEmail } from "./data.action"
import Blog from "../models/Blog";
import { revalidatePath } from "next/cache";

export interface createBlogProps {
  title: string
  banner: { public_id: string, secure_url: string }
  description: string
  content: OutputData
  tags: string[]
  draft: boolean
}

export const createBlogPost = async({title, banner, description, content, tags, draft}:createBlogProps) => {
  
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  const postAuthor = await getUserByEmail(session.user.email);

  if (!postAuthor) {
    return null;
  }

  const author = postAuthor._id;

  try {
    connectToDatabase();
    const blog = await Blog.create({title, banner, description, content, author, tags, draft});
    blog.save();
    postAuthor.blogs.push(blog._id)
    { !draft && postAuthor.totalBlogs++ }
    postAuthor.save();
    revalidatePath("/");
    return {success: 'Blogpost successfully created'}
  } catch (error) {
    return {error: 'Internal server error'}
  }

}

export const getLatestBlogPosts = async() => {

  connectToDatabase();
  const maxLimit = 5;

  try {
    const blogs = Blog.find({draft: false})
    .populate('author', 'name image profileImage username')
    .sort({'createdAt': -1})
    .select("_id description title banner tags likes createdAt")
    .limit(maxLimit);

    return blogs
  } catch (error) {
    return {error: 'Internal server error'}
  }

}

export const getTrendingBlogPosts = async() => {

  connectToDatabase();
  const maxLimit = 5;

  try {
    const blogs = Blog.find({draft: false})
    .populate('author', 'name image profileImage username')
    .sort({'totalReads':-1, 'totalLikes':-1, 'createdAt':-1 })
    .select("_id title createdAt")
    .limit(maxLimit);

    return blogs
  } catch (error) {
    return {error: 'Internal server error'}
  }

}