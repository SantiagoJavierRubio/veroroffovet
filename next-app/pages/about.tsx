import Layout from '@/components/Layout/Layout'
import Container from '@/components/Container'
import Photo from '@/components/Photo'
import { FC } from 'react'

// TODO: agregar estilos

export default function About() {
  return (
    <Layout title="Sobre mi">
      <h1 className="text-primary mb-0 text-center text-6xl font-bold">
        Sobre mi
      </h1>
      <Photo
        src="/photos/veroycachilos.jpg"
        alt="con toto y amigos"
        className="m-auto mt-2 w-64 shadow-2xl"
      />
      <Container className="text-primary text-lg">
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="px-2 sm:px-16">
            Me recibí en el año 2019 de Veterinaria en la Universidad de Buenos
            Aires y desde entonces trabajo apasionadamente con animales grandes
            y pequeños
          </p>
          <p className="px-2 sm:px-16">
            Me especializo en nutricion de felinos y caninos, atendiendo casos
            clinicos y brindando soluciones para mejorar las dietas de mis
            pacientes
          </p>
          <p className="px-2 sm:px-16">
            Ademas de las asesorias realizo divulgacion de buenas practicas y
            recomendaciones para la nutricion animal en{' '}
            <a
              href="https://www.instagram.com/vr.veterinaria/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary underline"
            >
              mi instagram
            </a>
          </p>
          <div className="mt-4 px-2">
            <p className="mb-2">
              Algunos cursos y capacitaciones en los que participe:
            </p>
            <ul className="pl-2 sm:list-disc sm:pl-8">
              <Curso
                type="Máster"
                title="Alimentación natural y nutrición funcional para perros y
                gatos"
                institution="Biovet"
              />
              <Curso
                type="Curso"
                title="Nutrición natural en caninos y felinos domésticos"
                institution="Red
                Animal Chile"
              />
              <Curso
                type="Curso"
                title="Nutrición natural de mascotas y taller de patologías"
                institution="Christian Vergara"
              />
              <Curso
                type="Curso"
                title="Alimentación fisiológica en perros"
                institution="Clara Fontana"
              />
              <Curso
                type="Asistencia a las"
                title="Jornadas Internacionales sobre
                Gastroenterología felina"
                institution="Asociación Argentina de Medicina
                Felina"
              />
              <Curso
                type="Curso"
                title="Geriatría Clínica en caninos y felinos"
                institution="CPF Veterinaria"
              />
              <Curso
                type="Curso"
                title="Acute Canine Herbalism Specialist"
                institution="Dogs Naturally"
              />
              <Curso
                type="Curso"
                title="Microbiota intestinal"
                institution="Christian Vergara"
              />
              <Curso
                type="Curso"
                title="Plantas Medicinales del Mundo y Fitoterapia aplicada"
                institution="Instituto de Investigaciones herbarias"
                inCourse
              />
            </ul>
          </div>
        </div>
      </Container>
      <Photo
        src="/photos/veroyleon.jpg"
        alt="con leon mi perrito"
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
      <span className="float-right -mt-2 text-right font-bold sm:float-none sm:text-left">
        {institution}
      </span>{' '}
      {inCourse && (
        <span className="text-secondary text-sm italic">(en curso)</span>
      )}
    </li>
  )
}
