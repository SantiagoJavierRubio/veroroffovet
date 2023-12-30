import Container from '@/components/Container'
import Layout from '@/components/Layout/Layout'
import { useState, ChangeEvent, FormEvent } from 'react'
import { useSession } from 'next-auth/react'
import SendButton from '@/components/SendButton'
import { Curso } from '@prisma/client'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'
import { FiLoader } from 'react-icons/fi'
import { BiBookAdd } from 'react-icons/bi'
import { useCursos } from '@/api/admin/cursos'

export default function CursosPage() {
  const { data: session, status } = useSession()
  const { get, post } = useCursos()
  const [inputs, setInputs] = useState<Curso[]>(get.data || [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    post.mutate(inputs)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setInputs(prev =>
      prev.map(course => {
        if (course.id !== id) return course
        else
          return e.target.type === 'checkbox'
            ? {
                ...course,
                inCourse: e.target.checked
              }
            : {
                ...course,
                [e.target.name]: e.target.value
              }
      })
    )
  }

  const addNew = () => {
    setInputs(prev => [
      ...prev,
      {
        id: prev.length.toString(),
        type: '',
        title: '',
        institution: '',
        inCourse: false
      }
    ])
  }
  return (
    <Layout>
      <Container>
        <Link href="/admin" className="absolute top-0 left-0">
          <button className="text-secondary flex items-center justify-start">
            <FaChevronLeft /> Volver
          </button>
        </Link>
        <h1 className="text-primary text-center text-3xl font-bold">
          Editar cursos
        </h1>
        {get.status === 'pending' || status === 'loading' ? (
          <div className="text-primary m-auto w-full animate-pulse text-center text-2xl font-bold">
            <FiLoader className="animate-spin" />
          </div>
        ) : (
          <>
            {session === null ? (
              <div className="m-auto text-center text-2xl font-bold text-red-500">
                Unauthorized
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 sm:p-2"
              >
                <div className="grid w-full grid-cols-8 gap-2">
                  <label
                    htmlFor="type"
                    className="text-primary col-span-1 text-center text-lg font-semibold underline"
                  >
                    Tipo
                  </label>
                  <label
                    htmlFor="title"
                    className="text-primary col-span-4 text-center text-lg font-semibold underline"
                  >
                    Título
                  </label>
                  <label
                    htmlFor="institution"
                    className="text-primary col-span-2 text-center text-lg font-semibold underline"
                  >
                    Institución
                  </label>
                  <label
                    htmlFor="inCourse"
                    className="text-primary col-span-1 text-center text-lg font-semibold underline"
                  >
                    En curso
                  </label>
                </div>
                {inputs.map(course => (
                  <div
                    key={course.id}
                    className="grid w-full grid-cols-8 gap-1"
                  >
                    <input
                      name="type"
                      type="text"
                      value={course.type}
                      onChange={e => handleChange(e, course.id)}
                      className="bg-secondary col-span-1 rounded-sm p-2 text-base font-semibold text-white"
                    />
                    <div className="text-primary col-span-4 flex text-xl">
                      &quot;
                      <input
                        name="title"
                        type="text"
                        value={course.title}
                        onChange={e => handleChange(e, course.id)}
                        className="bg-secondary grow rounded-sm p-2 text-base font-semibold text-white"
                      />
                      &quot;
                    </div>
                    <input
                      name="institution"
                      type="text"
                      value={course.institution}
                      onChange={e => handleChange(e, course.id)}
                      className="bg-secondary col-span-2 rounded-sm p-2 text-base font-semibold text-white"
                    />
                    <input
                      type="checkbox"
                      name="inCourse"
                      checked={course.inCourse}
                      onChange={e => handleChange(e, course.id)}
                      className="bg-secondary col-span-1 rounded-sm p-2 text-base font-semibold text-white"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNew}
                  className="text-primary bg-secondary/50 hover:bg-secondary/80 m-auto mt-4 flex items-center gap-2 rounded-md p-2 text-xl transition-all hover:shadow-md hover:shadow-stone-500/50 active:shadow-none"
                >
                  Añadir nuevo <BiBookAdd />
                </button>
                <div className="m-auto my-6 flex justify-center">
                  <SendButton
                    sendingStatus={post.status}
                    errorMessage={post.error?.message}
                  />
                </div>
              </form>
            )}
          </>
        )}
      </Container>
    </Layout>
  )
}
