import React from 'react'
import Container from '@/components/Container'
import { Metadata } from 'next'
import { OpinionForm } from './_components/OpinionForm'

export const metadata: Metadata = {
  title: 'Encuesta sobre tu experiencia'
}

export default function Opinion() {
  return (
    <Container>
      <h1 className="text-primary mb-0 text-center text-2xl font-bold sm:text-4xl">
        Encuesta sobre tu experiencia con la asesoría
      </h1>
      <h2 className="text-primary mb-0 text-center text-xl font-semibold sm:text-3xl">
        Me interesa conocer tu opinión
      </h2>
      <h3 className="text-secondary mb-0 text-center text-lg font-normal sm:text-xl">
        ¡Gracias por ayudarme a mejorar!
      </h3>
      <OpinionForm />
    </Container>
  )
}
