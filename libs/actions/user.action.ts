"use server"

import connectToDatabase from "../utils/connectDatabase";
import User from "../models/User";
import Blog from "../models/Blog";
import { revalidatePath } from "next/cache";
import { getCurrentUser, getCurrentUserWithPassword, getSession, getUserByEmail, getUserByUsername } from "./data.action";
import bcrypt from 'bcryptjs'
import { usernameGenerator } from "@/hooks/usernameGenerator";
import cloudinary from "../utils/cloudinary";

type editProfileProps = {
  profileImage: { public_id: string, secure_url: string } | undefined,
  image: string | undefined
  bio: string | undefined
  instagram: string | undefined
  facebook: string | undefined
  twitter: string | undefined
  github: string | undefined
  youtube: string | undefined
  website: string | undefined
  username: string | undefined
  path: string | undefined
  isNewImage: boolean
}


export const createUser = async ({email, password, fullname}: {email:string, password:string, fullname: string}) => {
  try {
    await connectToDatabase();

    let username;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {error: 'User already exists! Login'}
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      username = usernameGenerator(email);
      const existingUsername = await getUserByUsername(username);

      if (existingUsername) {
        return username = usernameGenerator(email);
      }

      const user = await User.create({email, name:fullname, hashedPassword, username })
      user.save();
      return {success: 'Account created! You can login'}
    }
  } catch (error) {
    return {error: 'Internal server error'}
  }
};

export const fetchSearchedUsers = async ({query, path}:{query:string, path:string}) => {
  const maxLimit = 30;

  let findQuery = { $or: [{ name: new RegExp(query, 'i')},{ username: new RegExp(query, 'i') },{ email: new RegExp(query, 'i') },]}

  try {
    await connectToDatabase();

    const usersCount = await User.countDocuments(findQuery);

    const users = await User.find(findQuery)
      .select("_id name username image profileImage ")
      .limit(maxLimit);

    const data = JSON.parse(JSON.stringify({data: users, usersCount: usersCount}));

    revalidatePath(path)
    return data;
  } catch (error) {
    return {error: "Internal server error" }
  }
}

export const fetchUser = async ({userId}:{userId: string}) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({_id: userId})
    .select('-hashedPassword -blogs')

    const data = JSON.parse(JSON.stringify(user))
    return data;
  } catch (error) {
    return {error: "Internal server error"}
  }
}

export const fetchUserBlogPosts = async ({page, userId, queryText}: {page:number, userId: string, queryText?:string}) => {
  const maxLimit = 5;

  let query;

  if (queryText) {
    query = { draft: false, author: userId, $or: [{ title: new RegExp(queryText, 'i')},{ description: new RegExp(queryText, 'i') },{ tags: new RegExp(queryText, 'i') },]}
  } else {
    query = { draft: false, author: userId };
  }

  try {
    await connectToDatabase();

    const blogCount = await Blog.countDocuments(query);

    const blogs = await Blog.find(query)
      .populate("author", "name image profileImage username")
      .sort({ createdAt: -1 })
      .select("_id description title banner tags totalLikes totalReads totalComments likes createdAt")
      .skip((+page - 1) * maxLimit)
      .limit(maxLimit);

      const data = JSON.parse(JSON.stringify({ data: blogs, blogCount: blogCount, page: page }))

      revalidatePath('/blogs')
    return data;
  } catch (error) {
    return { status: "Internal server error"};
  }
}

export const fetchCurrentUser = async () => {
  connectToDatabase();
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const user = await User.findOne({email: session.user.email}).select("-hashedPassword -updatedAt");

    if (!user) {
      return null;
    }

    const currentUser = JSON.parse(JSON.stringify(user))

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export const changeUserPassword = async ({currentpassword, newpassword}:{currentpassword:string, newpassword:string}) => {

  try {
    connectToDatabase();

    const currentUser = await getCurrentUserWithPassword();

    if (!currentUser) {
      return null;
    }

    const googleAuthenticated = currentUser.hashedPassword === '';

    if (googleAuthenticated) {
      return {error: 'You cannot change password! You logged with Google'}
    }

    const passwordMatch = await bcrypt.compare(currentpassword, currentUser.hashedPassword)
    console.log(passwordMatch)

    if (!passwordMatch) {
      return {error: 'Your current password is wrong!'}
    }

    if (passwordMatch) {
      const newHashedPassword = await bcrypt.hash(newpassword, 10);
      await User.findOneAndUpdate({_id: currentUser._id}, {hashedPassword: newHashedPassword});

      return {success: 'Password successfully changed'}
    }

  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const updateUserProfile = async ({ profileImage, image, bio, instagram, facebook, twitter, github, youtube, website, username, path, isNewImage }:editProfileProps) => {
 try {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }
  
  const usernameExist = await User.findOne({username: username});

  if (usernameExist && usernameExist.email !== currentUser.email) {
    return {error: 'Username already exists'}
  }

  const oldProfileImage = currentUser.profileImage;

  if (isNewImage === true) {
    cloudinary.uploader.destroy(oldProfileImage.public_id, function(error: any,result: any) {
      console.log(result, error) })
      .then((resp: any) => console.log(resp))
      .catch((_err: any)=> console.log("Something went wrong, please try again later."));
  }

  const updateProfileData = {
    profileImage: profileImage,
    image: image,
    bio: bio,
    instagram: instagram,
    facebook: facebook,
    twitter: twitter,
    github: github,
    youtube: youtube,
    website: website,
    username: username,
  }

  await User.findOneAndUpdate({_id: currentUser._id}, updateProfileData)
  revalidatePath(path as string)
  return {success: 'Profile successfully updated!'}
 } catch (error) {
  return {error: 'Internal server error'}
 }
}