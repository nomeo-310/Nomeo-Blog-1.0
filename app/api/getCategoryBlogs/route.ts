import Blog from "@/libs/models/Blog";
import connectToDatabase from "@/libs/utils/connectDatabase";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request:NextRequest) => {
  const body = await request.json();
  const { tags, page } = body;
  const maxLimit = 3;
  let findQuery = {draft: false, tags: tags}
  
  try {
    await connectToDatabase();

    const blogCount = await Blog.countDocuments({draft: false, tags: tags});

    const blogs = await Blog.find(findQuery)
    .populate('author', 'name image profileImage username')
    .sort({'createdAt': -1})
    .select("_id description title banner tags likes createdAt")
    .skip((page - 1) * maxLimit)
    .limit(maxLimit);

    return NextResponse.json({data: blogs, blogCount: blogCount, page: page});
  } catch (error) {
    return new NextResponse('Internal server error', {status: 500})
  }
}
