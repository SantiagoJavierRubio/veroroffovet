import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { MdAdminPanelSettings } from 'react-icons/md'

export function AdminOptions() {
  const { data: session } = useSession()
  if (!session) return null
  return (
    <Link
      href="/admin"
      className="bg-secondary/50 absolute top-1/2 right-0 flex -translate-y-1/2 flex-col items-center rounded-md p-2 text-xs md:right-2"
    >
      Admin
      <MdAdminPanelSettings size={26} />
    </Link>
  )
}
