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
    <div className="flex h-full max-w-full flex-col items-center justify-center rounded-md px-0 transition-all hover:scale-105 active:scale-95 active:delay-200 sm:flex-row md:gap-4 lg:px-6">
      <div
        className={`relative aspect-square w-8 shrink-0 p-0 sm:h-9 sm:w-9 sm:bg-transparent sm:ring-0 sm:ring-offset-0 ${
          selected &&
          'ring-offset-primary/80 bg-secondary/10 ring-secondary/40 rounded-full ring-1 ring-offset-8'
        }`}
      >
        <Image src={icon} fill alt={title} />
      </div>
      <h4
        className={`hidden text-center font-semibold text-stone-100 md:inline md:text-left md:text-xs lg:text-base ${
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
  RECURSOS: 'recursos',
  ABOUT: 'about'
}

function setCurrentPage() {
  const loc = window.location.href
  if (loc.includes(LOCATIONS.ASESORIAS)) return LOCATIONS.ASESORIAS
  else if (loc.includes(LOCATIONS.CLINICA)) return LOCATIONS.CLINICA
  else if (loc.includes(LOCATIONS.RECURSOS)) return LOCATIONS.RECURSOS
  else if (loc.includes(LOCATIONS.ABOUT)) return LOCATIONS.ABOUT
  else return LOCATIONS.INICIO
}

export default function NavBar() {
  const [current, setCurrent] = useState(LOCATIONS.INICIO)
  useEffect(() => {
    setCurrent(setCurrentPage)
  }, [])
  const gridCols = `grid-cols-${Object.keys(LOCATIONS).length}`
  return (
    <nav
      className={`bg-primary border-secondary fixed bottom-0 left-0 z-50 
      grid min-h-fit w-full grid-flow-col gap-4 p-4 shadow-lg lg:gap-6 ${gridCols}
      sm:absolute sm:top-0 sm:bottom-full sm:border-b-2 md:px-12 lg:px-20`}
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
          title="Asesorías nutricionales"
          icon="/svgs/dog-food.svg"
          selected={current === LOCATIONS.ASESORIAS}
        />
      </Link>
      <Link href="/clinica">
        <LinkButton
          title="Clínica a domicilio"
          icon="/svgs/veterinarian.svg"
          selected={current === LOCATIONS.CLINICA}
        />
      </Link>
      <Link href="/about">
        <LinkButton
          title="Sobre mi"
          icon="/svgs/stethoscope.svg"
          selected={current === LOCATIONS.ABOUT}
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
