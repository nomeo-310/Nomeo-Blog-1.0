'use server'

import * as z from 'zod'
import { createUserValidation } from "../lib/validationSchemas"
import bcrypt from 'bcryptjs'
import {prismaClient} from '@/app/lib/connectDatabase'
import { getUserByEmail } from './data.action'


export const createUser = async (values:z.infer<typeof createUserValidation>) => {
  const validUserData = createUserValidation.safeParse(values);

  if (!validUserData.success) {
    return {error: 'Invalid credentials'}
  }

  const { email, password, fullname} = validUserData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return {error: 'Email already in use'}
  }

  await prismaClient.user.create({data: {email, name:fullname, hashedPassword}})
  return {success: 'User successfully created'}
}



