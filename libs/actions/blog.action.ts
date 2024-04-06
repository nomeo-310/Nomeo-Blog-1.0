"use server";

import { OutputData } from "@editorjs/editorjs";
import connectToDatabase from "../utils/connectDatabase";
import { getBlogPostById, getCurrentUser, getSession, getUserByEmail,} from "./data.action";
import Blog from "../models/Blog";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import User from "../models/User";
import Notification from "../models/Notifications";
import cloudinary from "../utils/cloudinary";

export interface createBlogProps {
  title: string;
  banner: { public_id: string; secure_url: string };
  description: string;
  content: OutputData;
  tags: string[];
  draft: boolean;
}



export const createBlogPost = async ({title, banner, description, content, tags, draft,}: createBlogProps) => {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  const postAuthor = await getUserByEmail(session.user.email);

  if (!postAuthor) {
    return null;
  }

  const author = postAuthor._id;
  const newTags = tags.map((tag: string) => tag.toLowerCase());

  try {
    connectToDatabase();
    const blog = await Blog.create({title,banner,description,content,author,tags: newTags,draft});
    blog.save();
    postAuthor.blogs.push(blog._id);
    {
      !draft && postAuthor.totalBlogs++;
    }
    postAuthor.save();

    revalidatePath("/");
    return { success: "Blogpost successfully created" };
  } catch (error) {
    return { error: "Internal server error" };
  }
};

export const likeBlogPost = async (blogId: string, pathname: string) => {
  const newBlogId = new ObjectId(blogId);
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const currentPost = await getBlogPostById(blogId);

  if (!currentPost) {
    return null;
  }

  try {
    connectToDatabase();

    if (currentUser.likedBlogs.includes(newBlogId)) {
      await User.findOneAndUpdate({ _id: currentUser._id },{ $pull: { likedBlogs: blogId } });
      await Blog.findOneAndUpdate({ _id: blogId },{ $pull: { likes: currentUser._id }, $inc: { totalLikes: -1 } });

      await Notification.findOneAndDelete({
        type: "like",
        blog: blogId,
        user: currentUser._id,
      });

      revalidatePath(pathname);
      return { success: "Post unliked", liked: false };
    } else {
      await User.findOneAndUpdate({ _id: currentUser._id },{ $push: { likedBlogs: blogId } });
      await Blog.findOneAndUpdate({ _id: blogId }, { $push: { likes: currentUser._id }, $inc: { totalLikes: +1 } });

      const notificationDetails = {
        type: "like",
        blog: blogId,
        notificationFor: currentPost.author,
        user: currentUser._id,
      };
      const newNotification = await Notification.create(notificationDetails);
      newNotification.save();

      revalidatePath(pathname);
      return { success: "Post liked", liked: true };
    }
  } catch (error) {
    return { error: "Internal server error" };
  }
};

export const fetchLatestBlogPosts = async ({ page, path }: { page: number, path: string }) => {
  const maxLimit = 5;

  try {
    await connectToDatabase();

    const blogCount = await Blog.countDocuments({ draft: false });

    const blogs = await Blog.find({ draft: false })
      .populate("author", "name image profileImage username")
      .sort({ createdAt: -1 })
      .select("_id description title banner tags totalLikes totalReads totalComments likes createdAt")
      .skip((+page - 1) * maxLimit)
      .limit(maxLimit);

    const data = JSON.parse(JSON.stringify({ data: blogs, blogCount: blogCount, page: page }));

    revalidatePath(path)
    return data;
  } catch (error) {
    return { error: "Internal server error" };
  }
};

export const fetchSingleBlogPost = async ({ blogId, path }: { blogId: string, path?: string }) => {
  const newBlogId = new ObjectId(blogId);
  try {
    await connectToDatabase();

    const currentUser = await getCurrentUser();

    if (currentUser) {
      const currentBlog = await Blog.findOne({ _id: blogId });

      if (!currentBlog) {
        return null;
      }

      if (!currentBlog.reads.includes(currentUser._id)) {
        currentUser.readBlogs.push(newBlogId);
        currentBlog.totalReads++;
        currentUser.totalReads++;
        currentBlog.reads.push(currentUser._id);
      }

      currentBlog.save();
      currentUser.save();
    }

    const sentBlog = await Blog.findOne({ _id: blogId })
      .populate("author", "name username image profileImage")
      .select(
        "title description content totalLikes totalComments tags _id createdAt banner likes totalReads"
      );

    const data = JSON.parse(JSON.stringify(sentBlog));

    { path && revalidatePath(path) }
    return data;
  } catch (error) {
    return { error: "Internal server error" };
  }
};

export const fetchCategoryBlogs = async ({tags, page, path}: {tags:string, page: number, path: string}) => {
  const maxLimit = 4;
  let findQuery = { draft: false, tags: tags };

  try {
    await connectToDatabase();

    const blogCount = await Blog.countDocuments(findQuery);

    const blogs = await Blog.find(findQuery)
      .populate("author", "name image profileImage username")
      .sort({ createdAt: -1 })
      .select("_id description title banner tags likes createdAt")
      .skip((+page - 1) * maxLimit)
      .limit(maxLimit);

    const data = JSON.parse(JSON.stringify({ data: blogs, blogCount: blogCount, page: page }))
    revalidatePath(path)
    return data;
  } catch (error) {
    return { error: "Internal server error" };
  }
}

export const fetchSearchItems = async ({query, page, path}: {query:string, page:number, path: string}) => {
  const maxLimit = 5;
  let findQuery = { draft: false, $or: [{ title: new RegExp(query, 'i')},{ description: new RegExp(query, 'i') },{ tags: new RegExp(query, 'i') },]}

  try {
    await connectToDatabase();

    const blogCount = await Blog.countDocuments(findQuery);

    const blogs = await Blog.find(findQuery)
      .populate("author", "name image profileImage username")
      .sort({ createdAt: -1 })
      .select("_id description title banner tags likes createdAt")
      .skip((+page - 1) * maxLimit)
      .limit(maxLimit);

    const data = JSON.parse(JSON.stringify({ data: blogs, blogCount: blogCount, page: page }))
    revalidatePath(path);
    return data;
  } catch (error) {
    return {error: "Internal server error"};
  }
}

export const fetchSimilarBlogPosts = async ({blogId, path}:{blogId:string, path?: string}) => {
  const maxLimit = 6;

  try {
    await connectToDatabase();
    const originalBlog = await Blog.findOne({_id: blogId})

    if (!originalBlog) {
      return null;
    }

    const newTags = originalBlog.tags;

    let findQuery = { draft: false, tags: newTags[0], _id: { $ne: originalBlog._id }}

    const blogs = await Blog.find(findQuery)
      .populate("author", "name image profileImage username")
      .sort({ createdAt: -1 })
      .select("_id description title banner tags totalLikes totalReads totalComments likes createdAt")
      .limit(maxLimit);

    const data = JSON.parse(JSON.stringify(blogs))
    { path && revalidatePath(path) }
    return data;
  } catch (error) {
    return { error: "Internal server error"};
  }
}

export const fetchTrendingBlogPosts = async ({path}:{path: string}) => {
  const maxLimit = 5;

  try {
    await connectToDatabase();
    const blogs = await Blog.find({draft: false})
    .populate('author', 'name image profileImage username')
    .sort({'totalReads':-1, 'totalLikes':-1, 'createdAt':-1 })
    .select("_id title createdAt")
    .limit(maxLimit);

    const data = JSON.parse(JSON.stringify(blogs))
    revalidatePath(path)
    return data;
  } catch (error) {
    return {error: "Internal server error"}
  }
}

export const deleteBlogPost = async ({path, blogId}:{path:string, blogId:string}) => {
  connectToDatabase();

  try {
    const blog = await getBlogPostById(blogId);
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {error: 'You are not logged in'}
    } else {
      await User.findOneAndUpdate({_id: currentUser._id}, {$pull: { blogs: blogId }, $inc: {totalBlogs: -1}})
    }

    if (!blog) {
      return {error: 'Blog does not exist'}
    } else {
      const oldBanner = blog.banner;
  
      if (oldBanner.public_id !== '') {
        cloudinary.uploader.destroy(oldBanner.public_id, function(error: any,result: any) {
          console.log(result, error) })
          .then((resp: any) => console.log(resp))
          .catch((_err: any)=> console.log("Something went wrong, please try again later."));
      }
    }

    await Blog.findOneAndDelete({_id: blogId});
    revalidatePath(path);
    return {success: 'Blogpost successfully deleted'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
}





