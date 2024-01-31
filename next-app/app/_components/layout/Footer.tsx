import Link from 'next/link'
import { MdOutlineReportProblem } from 'react-icons/md'

export default function Footer() {
  return (
    <footer className="to-terciary from-terciary/10 text-primary relative mt-8 hidden h-24 w-full flex-col items-center justify-start bg-gradient-to-b p-6 sm:flex">
      <p>Verónica Roffo - Veterinaria MN 10468</p>
      <p>&copy; 2023 - Buenos Aires, Argentina</p>
      <div className="absolute bottom-0 left-1 flex flex-col items-start text-right text-xs">
        <p>Vectors and icons by </p>
        <div className="flex gap-1">
          <a
            href="https://dribbble.com/reggid?ref=svgrepo.com"
            target="_blank"
            className="hover:text-secondary underline after:no-underline after:content-[',']"
            rel="noreferrer"
          >
            Aslan
          </a>
          <a
            href="https://soco-st.com/?ref=svgrepo.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-secondary underline after:no-underline after:content-[',']"
          >
            Soco St
          </a>
          <a
            href="https://twitter.com/pablamarmolejo?ref=svgrepo.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-secondary underline"
          >
            Pabla Marmolejo
          </a>
        </div>
        <p>
          in CC Attribution License via{' '}
          <a href="https://www.svgrepo.com/" target="_blank" rel="noreferrer">
            SVG Repo
          </a>
        </p>
      </div>
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
