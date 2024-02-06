import { useSession } from 'next-auth/react'

export default function Nav({
  children,
  locLen
}: React.PropsWithChildren & { locLen: number }) {
  const { data: session } = useSession()
  const gridCols = `grid-cols-${locLen + +!!session}`

  return (
    <nav
      className={`bg-primary border-secondary/70 fixed bottom-0 left-0 z-50 grid 
  min-h-fit w-full grid-flow-col gap-4 border-t-[1px] p-4 shadow-lg lg:gap-6 ${gridCols}
  sm:absolute sm:top-0 sm:bottom-full sm:border-t-0 sm:border-b-[1px] md:px-12 lg:px-20`}
    >
      {children}
    </nav>
  )
}
