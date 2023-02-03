import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface LinkBtnProps {
  title: string
  icon: string
  selected?: boolean
}

const LinkButton = (props: LinkBtnProps) => {
  const { icon, title, selected } = props
  return (
    <div className="flex h-full max-w-full flex-col items-center justify-center rounded-md transition-all hover:shadow-xl sm:flex-row sm:gap-4 sm:px-8">
      <div className="relative h-8 w-8 shrink-0 p-0 sm:h-10 sm:w-10 md:h-12 md:w-12">
        <Image src={icon} fill alt={title} />
      </div>
      <h4
        className={`hidden text-center font-semibold sm:inline md:text-lg ${
          selected && 'underline underline-offset-4'
        }`}
      >
        {title}
      </h4>
    </div>
  )
}

const LOCATIONS = {
  INICIO: '/',
  ASESORIAS: 'asesorias',
  CLINICA: 'clinica',
  RECURSOS: 'recursos'
}

function setCurrentPage() {
  const loc = window.location.href
  if (loc.includes(LOCATIONS.ASESORIAS)) return LOCATIONS.ASESORIAS
  else if (loc.includes(LOCATIONS.CLINICA)) return LOCATIONS.CLINICA
  else if (loc.includes(LOCATIONS.RECURSOS)) return LOCATIONS.RECURSOS
  else return LOCATIONS.INICIO
}

export default function NavBar() {
  const [current, setCurrent] = useState(LOCATIONS.INICIO)
  useEffect(() => {
    setCurrent(setCurrentPage)
  }, [])
  return (
    <nav
      className="bg-primary border-secondary fixed bottom-0 left-0 z-50 
      grid min-h-fit w-full grid-flow-col grid-cols-4 justify-center gap-4 p-4 shadow-lg
      sm:absolute sm:top-0 sm:bottom-full sm:border-b-2 md:px-16 lg:px-32"
    >
      <Link href="/">
        <LinkButton
          title="Inicio"
          icon="/svgs/pet-house.svg"
          selected={current === LOCATIONS.INICIO}
        />
      </Link>
      <Link href="/asesorias">
        <LinkButton
          title="Asesorias nutricionales"
          icon="/svgs/dog-food.svg"
          selected={current === LOCATIONS.ASESORIAS}
        />
      </Link>
      <Link href="/clinica">
        <LinkButton
          title="Clinica a domicilio"
          icon="/svgs/veterinarian.svg"
          selected={current === LOCATIONS.CLINICA}
        />
      </Link>
      <Link href="/recursos">
        <LinkButton
          title="Recursos"
          icon="/svgs/medical-history.svg"
          selected={current === LOCATIONS.RECURSOS}
        />
      </Link>
    </nav>
  )
}
