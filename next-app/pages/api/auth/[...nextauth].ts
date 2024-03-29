import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (user && user.id === process.env.ADMIN_ID) return true
      return false
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/admin`
    }
  }
})
