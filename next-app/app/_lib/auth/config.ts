import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession
} from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { prisma } from '@/prisma/client'
import { Role } from '@prisma/client'
import { NO_REPLY_FROM } from '../mail/constants'
import { customVerificationRequests } from './customVerificationRequest'

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
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: 465,
        auth: {
          user: 'noreply@veronicanutrivet.com.ar',
          pass: process.env.SMTP_NOREPLY_PASS
        }
      },
      from: NO_REPLY_FROM,
      sendVerificationRequest: customVerificationRequests
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
      return `${baseUrl}/api/signin`
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
