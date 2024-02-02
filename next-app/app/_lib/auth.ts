import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession
} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user }) {
      if (process.env.NODE_ENV === 'development') return true
      if (user && user.id === process.env.ADMIN_ID) return true
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
