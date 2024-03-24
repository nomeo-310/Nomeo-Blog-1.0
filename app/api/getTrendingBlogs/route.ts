import Blog from "@/libs/models/Blog";
import connectToDatabase from "@/libs/utils/connectDatabase";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request:NextRequest) => {
  const maxLimit = 5;
  
  try {
    await connectToDatabase();
    const blogs = await Blog.find({draft: false})
    .populate('author', 'name image profileImage username')
    .sort({'totalReads':-1, 'totalLikes':-1, 'createdAt':-1 })
    .select("_id title createdAt")
    .limit(maxLimit);

    return NextResponse.json(blogs);
  } catch (error) {
    return new NextResponse('Internal server error', {status: 500})
  }
}