import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Asesorías nutricionales - Formulario'
}

export default function FormularioLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
