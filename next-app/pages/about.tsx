import Layout from '@/components/Layout/Layout'
import Container from '@/components/Container'
import Photo from '@/components/Photo'
import IgLogo from '../public/svgs/ig_logo.svg'
import { Curso } from '@prisma/client'
import { prisma } from '@/prisma/client'
import { FC } from 'react'

interface AboutProps {
  courses: Curso[]
}

export default function About({ courses }: AboutProps) {
  return (
    <Layout title="Sobre mi">
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
            {courses.map(course => (
              <Curso
                type={course.type}
                title={course.title}
                institution={course.institution}
                inCourse={course.inCourse}
                key={course.id}
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
    </Layout>
  )
}

interface CursoProps {
  type: string
  title: string
  institution: string
  inCourse?: boolean
}

const Curso: FC<CursoProps> = ({
  type,
  title,
  institution,
  inCourse = false
}) => {
  return (
    <li className="my-14 sm:my-auto">
      {type} <span className="italic">&quot;{title}&quot;</span>
      <span className="hidden sm:inline"> - </span>
      <br className="inline sm:hidden" />
      <span className="float-right -mt-2 text-right font-semibold sm:float-none sm:text-left">
        {institution}
      </span>{' '}
      {inCourse && (
        <span className="text-secondary text-sm italic">(en curso)</span>
      )}
    </li>
  )
}

export async function getStaticProps() {
  try {
    const courses = await prisma.curso.findMany()
    return {
      props: {
        courses
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        courses: []
      }
    }
  }
}
