"use server";

import { authOptions } from "../../app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import connectToDatabase from "../utils/connectDatabase";
import User from "../models/User";
import Blog from "../models/Blog";
import Comment from "../models/Comment";

export const getUserByEmail = async (email: string) => {
  connectToDatabase();
  try {
    const user = await User.findOne({ email: email });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    connectToDatabase();
    const user = await User.findOne({ _id: id });

    return user
  } catch (error) {
    return null;
  }
};

export const getBlogPostById = async (id: string) => {
  try {
    connectToDatabase();
    const blog = await Blog.findOne({ _id: id });

    return blog
  } catch (error) {
    return null;
  }
};

export const getCommentById = async (id: string) => {
  try {
    connectToDatabase();
    const comment = await Comment.findOne({ _id: id });

    return comment
  } catch (error) {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  connectToDatabase();
  try {
    const user = await User.findOne({ username: username })
    .select("-hashedPassword -updatedAt");

    return user;
  } catch (error) {
    return null;
  }
};

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  connectToDatabase();
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await User.findOne({
      email: session.user.email,
    }).select("-hashedPassword -updatedAt");

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};
export const getCurrentUserWithPassword = async () => {
  connectToDatabase();
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await User.findOne({email: session.user.email});

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};


