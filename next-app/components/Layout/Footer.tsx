import Link from 'next/link'
import { MdOutlineReportProblem } from 'react-icons/md'

export default function Footer() {
  return (
    <footer className="to-terciary from-terciary/10 text-primary relative mt-8 hidden h-24 w-full flex-col items-center justify-start bg-gradient-to-b p-6 sm:flex">
      <p>Veronica Roffo - Veterinaria MN 10468</p>
      <p>&copy; 2023 - Buenos Aires, Argentina</p>
      <div className="absolute bottom-2 right-2">
        <Link
          href="/report"
          className="hover:text-secondary flex items-center text-right text-xs underline"
        >
          <MdOutlineReportProblem className="mr-1 no-underline" />
          Reportar un problema
        </Link>
      </div>
    </footer>
  )
}
