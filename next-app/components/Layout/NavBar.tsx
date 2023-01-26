import Link from "next/link"
import Image from "next/image";
import styles from "../../styles/NavBar.module.css"

interface LinkBtnProps {
    title: string;
    icon: string;
    selected?: boolean
}

const LinkButton = (props: LinkBtnProps) => {
    return(
        <div className={styles.linkBtn}>
            <Image src={props.icon} width={30} height={30} alt={props.title} />
            <h4 className={props.selected ? styles.selected : ''}>
                {props.title}
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
    if(loc.includes(LOCATIONS.ASESORIAS)) return LOCATIONS.ASESORIAS
    else if(loc.includes(LOCATIONS.CLINICA)) return LOCATIONS.CLINICA
    else if(loc.includes(LOCATIONS.RECURSOS)) return LOCATIONS.RECURSOS
    else return LOCATIONS.INICIO
}

export default function NavBar() {
    const current = setCurrentPage()
  return (
    <nav className={styles.navbar}>
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
