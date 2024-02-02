import { useSession } from 'next-auth/react'

export default function useAdminSession() {
  const { data: session, status } = useSession()
  let adminUser = undefined
  if (session && session.user && session.user.role == 'ADMIN') {
    adminUser = session.user
  }
  return { status, adminUser }
}
