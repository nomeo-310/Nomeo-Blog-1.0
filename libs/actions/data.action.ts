'use server'

import { authOptions } from "../../app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import connectToDatabase from "../utils/connectDatabase";
import User from "../models/User";

export const getUserByEmail = async(email:string) => {
  connectToDatabase();
  try {
    const user = await User.findOne({email: email});

    return user
  } catch (error) {
    return null
  }
}

export const getUserById = async(id:string) => {
  connectToDatabase();
  try {
    const user = await User.findOne({id: id});

    return user
  } catch (error) {
    return null
  }
}

export const getUserByUsername = async(username:string) => {
  connectToDatabase();
  try {
    const user = await User.findOne({username: username});

    return user
  } catch (error) {
    return null
  }
}

export const getSession = async () => {
  return await getServerSession(authOptions)
}

export const getCurrentUser = async () => {
  connectToDatabase();
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await User.findOne({email: session.user.email});

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error:any) {
    return null
  }
}

