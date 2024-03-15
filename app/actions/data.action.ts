'use server'

import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { prismaClient } from "../lib/connectDatabase";
import { getServerSession } from "next-auth";

export const getUserByEmail = async(email:string) => {
  try {
    const user = await prismaClient.user.findUnique({where: {email}})

    return user
  } catch (error) {
    return null
  }
}


export const getUserById = async(id:string) => {
  try {
    const user = await prismaClient.user.findUnique({where: {id}})

    return user
  } catch (error) {
    return null
  }
}

export const getSession = async () => {
  return await getServerSession(authOptions)
}

export const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prismaClient.user.findUnique({where: {email: session.user.email} })

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error:any) {
    return null
  }
}

