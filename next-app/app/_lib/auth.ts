import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession
} from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { prisma } from '@/prisma/client'
import { Role } from '@prisma/client'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string
      role: Role
    }
  }

  interface User {
    role: Role
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || '',
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    // }),
    EmailProvider({
      server: {
        service: 'gmail',
        port: 587,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      },
      from: process.env.GMAIL_USER
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false
      if (await prisma.user.findUnique({ where: { email: user.email } }))
        return true
      return false
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/admin`
    },

    session: ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role
      }
      return session
    }
  }
}

export const getServerAuthSession = () => getServerSession(authOptions)
