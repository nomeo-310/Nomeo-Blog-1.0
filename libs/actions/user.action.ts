'use server'

import * as z from 'zod'
import { createUserValidation } from "../utils/validationSchemas"
import bcrypt from 'bcryptjs'
import User from '../models/User'
import connectToDatabase from '../utils/connectDatabase'
import { getUserByEmail, getUserByUsername } from './data.action'
import { usernameGenerator } from '@/hooks/usernameGenerator'


export const createUser = async (values:z.infer<typeof createUserValidation>) => {
  const validUserData = createUserValidation.safeParse(values);

  if (!validUserData.success) {
    return {error: 'Invalid credentials'}
  }

  const { email, password, fullname} = validUserData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email)
  let username = usernameGenerator(email);

  const existingUsername = await getUserByUsername(username)

  if (existingUser) {
    return {error: 'Email already in use'}
  }

  if (existingUsername) {
    return username = usernameGenerator(email);
  }

  try {
    connectToDatabase();
    const user = await User.create({email, name:fullname, hashedPassword, username})
    user.save();
    return {success: 'User successfully created'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
}



