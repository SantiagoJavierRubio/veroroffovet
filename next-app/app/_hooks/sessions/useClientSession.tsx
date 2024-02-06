import { useSession } from 'next-auth/react'

export default function useClientSession() {
  const { data: session, status } = useSession()
  let clientUser = undefined
  if (session && session.user && session.user.role == 'CLIENT') {
    clientUser = session.user
  }
  return { status, clientUser }
}
