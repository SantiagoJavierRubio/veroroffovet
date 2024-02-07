import { getServerAuthSession } from '@/app/_lib/auth/config'
import { redirect } from 'next/navigation'

export async function GET() {
  const session = await getServerAuthSession()
  if (session?.user.role == 'ADMIN') return redirect('/admin')
  if (session?.user.role == 'CLIENT') return redirect('/user')
  return redirect('/')
}
