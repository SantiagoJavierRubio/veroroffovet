import { getServerAuthSession } from '@/app/_lib/auth/config'

export async function isAdmin() {
  const session = await getServerAuthSession()
  return !!session && !!session.user && session.user.role == 'ADMIN'
}
