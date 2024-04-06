"use server";

import Comment from "../models/Comment";
import connectToDatabase from "../utils/connectDatabase";
import { getCurrentUser, getBlogPostById, getCommentById } from "./data.action";
import { revalidatePath } from "next/cache";
import User from "../models/User";
import Notification from "../models/Notifications";
import Blog from "../models/Blog";

export interface getBlogCommentsProps {
  blogId: string;
  isReply: boolean;
  page: number;
  path?: string;
}

export interface createCommentProps {
  blogId?: string;
  blogAuthor?: string;
  comment: string;
  type: string;
  path: string;
  parentId?: string;
  isReply?: boolean;
}


export const createComment = async ({blogId, blogAuthor, comment, type, path, parentId, isReply,}: createCommentProps) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const currentBlog = await getBlogPostById(blogId!);
  if (!currentBlog) {
    return null;
  }

  const commentDetails = { blogId: blogId, blogAuthor: blogAuthor, comment: comment, commentAuthor: currentUser._id, type: type, parent: parentId, isReply: isReply,};

  try {
    connectToDatabase();
    const comment = await Comment.create(commentDetails);
    comment.save();

    currentBlog.totalComments++;
    currentBlog.comments.push(comment._id);
    { parentId ? currentBlog.totalParentComments++ : currentBlog.totalParentComments }
    currentBlog.save();

    const notificationDetails = { type: type, blog: blogId, notificationFor: blogAuthor, user: currentUser._id, comment: comment._id, repliedOnComment: parentId};

    const newNotification = await Notification.create(notificationDetails);
    newNotification.save();

    if (parentId) {
      const currentComment = await getCommentById(parentId!);

      if (!currentComment) {
        return null;
      }
      currentComment.children.push(comment._id);
      currentComment.save();
    }

    revalidatePath(path);
    return { success: "Comment created" };
  } catch (error) {
    return { error: "Internal server error" };
  }
};

export const fetchBlogComments = async ({blogId, isReply, page, path}: getBlogCommentsProps) => {
  const maxLimit = 5;
  let query = {blogId: blogId,isReply: isReply};

  try {
    await connectToDatabase();

    const commentCount = await Comment.countDocuments(query);

    const comments = await Comment.find(query)
      .populate("commentAuthor", "name image profileImage username")
      .populate({
        path: "children",
        populate: {
          path: "commentAuthor",
          model: User,
          select: "_id name image username comment",
        },
      })
      .sort({ createdAt: -1 })
      .skip((+page - 1) * maxLimit)
      .limit(maxLimit);

    const data = JSON.parse(JSON.stringify({ data: comments, commentCount: commentCount, page: page }));

    { path && revalidatePath(path) }
    return data;
  } catch (error) {
    return { error: "Internal server error" };
  }
};

export const deleteComments = async ({commentId, blogId, path, userId}: {commentId: string, blogId: string, path:string, userId:string}) => {
  try {
    await connectToDatabase();
    const currentComment = await Comment.findOne({_id: commentId})

    if (currentComment && currentComment.parent) {
      await Comment.findOneAndUpdate({_id: currentComment.parent}, {$pull: {children: commentId}})
    }

    if (currentComment && currentComment.children.length > 0) {
      await Blog.findOneAndUpdate({ _id: blogId },{ $inc: { totalParentComments: -1 } });
    }

    if (currentComment && currentComment.type === 'comment') {
      await Notification.findOneAndDelete({comment: commentId, user: userId});
    } else {
      await Notification.findOneAndDelete({reply: commentId, user: userId});
    }
    
    await Comment.findOneAndDelete({_id: commentId, commentAuthor: userId})
    await Blog.findOneAndUpdate({ _id: blogId },{ $pull: { comments: commentId }, $inc: { totalComments: -1 } });

    revalidatePath(path);
    return {success: "Comment deleted"}
  } catch (error) {
    return {error: "Internal server error"}
  }
}