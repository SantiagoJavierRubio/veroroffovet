import Container from '@/app/_components/common/Container'
import Photo from '@/app/_components/common/Photo'
import IgLogo from '../../public/svgs/ig_logo.svg'
import { Education } from './_components/Education'
import { prisma } from '@/prisma/client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre mi'
}

export default async function About() {
  const education = await prisma.education.findMany()
  return (
    <>
      <h1 className="text-primary mb-0 text-center text-5xl font-bold sm:text-6xl">
        Sobre mi
      </h1>
      <Photo
        src="/photos/veroycachilos.jpg"
        alt="con toto y amigos"
        className="m-auto mt-2 w-64 shadow-2xl"
      />
      <Container className="text-primary text-lg">
        <div className="after:border-primary flex flex-col items-center justify-center gap-6 after:m-auto after:w-1/2 after:border-b-[1px] after:content-[''] after:sm:border-b-0">
          <p className="px-2 text-center text-xl sm:px-16">
            🎓 Me recibí en el año 2019 de Veterinaria en la Universidad de
            Buenos Aires y desde entonces trabajo apasionadamente con animales
            grandes y pequeños
          </p>
          <p className="px-2 text-center text-xl sm:px-16">
            🍖 Me especializo en nutrición de felinos y caninos, atendiendo
            casos clinicos y brindando soluciones para mejorar las dietas de mis
            pacientes
          </p>
          <p className="px-2 text-center text-xl sm:px-16">
            <IgLogo className="mb-1 mr-1 inline aspect-square h-5 w-5" /> Además
            de las asesorías realizo divulgación de buenas prácticas y
            recomendaciones para la nutrición animal en{' '}
            <a
              href="https://www.instagram.com/vr.veterinaria/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary underline"
            >
              mi instagram
            </a>
          </p>
        </div>
        <div className="mt-8 px-2">
          <p className="-mb-4 text-xl font-bold sm:mb-4">
            Algunos cursos y capacitaciones en los que participé:
          </p>
          <ul className="pl-2 sm:list-disc sm:pl-8">
            {education.map(ed => (
              <Education
                type={ed.type}
                title={ed.title}
                institution={ed.institution}
                inCourse={ed.inCourse}
                key={ed.id}
              />
            ))}
          </ul>
        </div>
      </Container>
      <Photo
        src="/photos/veroyleon2.jpg"
        alt="con leon, mi perrito"
        className="border-terciary/50 m-auto mt-4 w-64 border-2 shadow-2xl"
      />
    </>
  )
}
