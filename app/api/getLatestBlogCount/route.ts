import Blog from "@/libs/models/Blog";
import connectToDatabase from "@/libs/utils/connectDatabase";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request:NextRequest) => {
  
  try {
    await connectToDatabase();

    const blogCount = await Blog.countDocuments({draft: false});

    return NextResponse.json({totalDocs: blogCount});
  } catch (error) {
    return new NextResponse('Internal server error', {status: 500})
  }
}
