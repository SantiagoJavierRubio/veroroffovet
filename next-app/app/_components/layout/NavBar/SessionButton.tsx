import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

export function SessionButton() {
  const { data: session } = useSession()
  const path = usePathname()
  if (!session) return null
  const title = session.user.role == 'ADMIN' ? 'Admin' : 'Mi Portal'
  const selected = path.includes('/admin') || path.includes('/user')
  return (
    <Link href="/api/signin">
      <div className="flex h-full max-w-full flex-col items-center justify-center rounded-md px-0 transition-all hover:scale-105 active:scale-95 active:delay-200 sm:flex-row md:gap-4 lg:px-6">
        <div
          className={`relative flex aspect-square w-8 shrink-0 items-center justify-center p-0 sm:h-9 sm:w-9 sm:bg-transparent md:ring-0 md:ring-offset-0 ${
            selected &&
            'ring-offset-primary/80 bg-secondary/10 ring-secondary/40 rounded-full ring-1 ring-offset-8'
          }`}
        >
          <FaUser size={28} />
        </div>
        <h4
          className={`hidden text-center font-semibold text-stone-100 md:inline md:text-left md:text-xs lg:text-base ${
            selected && 'underline underline-offset-4'
          }`}
        >
          {title}
        </h4>
      </div>
    </Link>
  )
}
