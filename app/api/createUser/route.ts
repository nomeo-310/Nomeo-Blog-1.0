import connectToDatabase from "@/libs/utils/connectDatabase";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { getUserByEmail, getUserByUsername } from "@/libs/actions/data.action";
import { usernameGenerator } from "@/hooks/usernameGenerator";
import User from "@/libs/models/User";


export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { email, password, fullname }:{email:string, password:string, fullname:string} = body;

  try {
    await connectToDatabase();

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      const username = usernameGenerator(email);

      const newUser = new User({email: email, name:fullname, hashedPassword: hashedPassword, username: username });
      await newUser.save();
      return NextResponse.json({message:'User successfully created'}, {status: 200})
    } else {
      return NextResponse.json({message: 'Email already in use'}, {status: 400})
    }
  } catch (error) {
    return NextResponse.json(error, {status: 500})
  }
}