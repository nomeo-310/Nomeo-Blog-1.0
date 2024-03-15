import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { loginUserValidation } from '@/libs/utils/validationSchemas'
import { prismaClient } from '@/libs/utils/connectDatabase'
import { getUserByEmail } from '@/libs/actions/data.action'

export const authOptions:AuthOptions = {
  adapter: PrismaAdapter(prismaClient) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: {label: 'email', type: 'text'},
        password: {label: 'password', type: 'password'}, 
      },
      async authorize(credentials) {
       const validLoginDetails = loginUserValidation.safeParse(credentials);

       if (validLoginDetails.success) {
        const { email, password } = validLoginDetails.data;

        const user = await getUserByEmail(email);
        if (!user || !user.hashedPassword)   throw new Error('Invalid credentials')
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword)

        if (passwordMatch) return user;

        if (!passwordMatch) throw new Error('Wrong password')


       }

       return null;
      },
    }),
  ],
  pages : { signIn: '/sign-in'},
  session: { strategy: 'jwt'},
  secret: process.env.NEXTAUTH_SECRET,
}

