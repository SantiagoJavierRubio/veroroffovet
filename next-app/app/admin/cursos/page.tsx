'use client'

import Container from '@/app/_components/common/Container'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import SendButton from '@/app/_components/common/SendButton'
import { Curso } from '@prisma/client'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'
import { FiLoader } from 'react-icons/fi'
import { BiBookAdd, BiLoaderAlt, BiTrash } from 'react-icons/bi'
import { useCursos } from '@/app/_queries/admin/cursos'

export type CursoInput = Omit<Curso, 'id'> & { id: string | undefined }

export default function CursosPage() {
  const { data: session, status } = useSession()
  const { get, post, deleteOne } = useCursos()
  const [inputs, setInputs] = useState<CursoInput[]>(get.data ?? [])

  useEffect(() => {
    if (get.status == 'success' && get.data) {
      setInputs(get.data)
    }
  }, [get.data, get.status])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    post.mutate(inputs)
  }

  const handleRemove = (id: string | number) => {
    if (typeof id == 'string') {
      deleteOne.mutate(id)
    } else {
      setInputs(prev => [...prev.splice(id, 1)])
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string | number
  ) => {
    setInputs(prev =>
      prev.map((course, index) => {
        if (course.id && course.id !== id) return course
        else if (typeof id == 'number' && index !== id) return course
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
        id: undefined,
        type: '',
        title: '',
        institution: '',
        inCourse: false
      }
    ])
  }
  return (
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
        <div className="text-primary mt-14 text-center text-2xl font-bold">
          <BiLoaderAlt size={36} className="m-auto animate-spin" />
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
              <div className="grid w-full grid-cols-9 gap-2">
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
              {inputs.map((course, index) => (
                <div key={course.id} className="grid w-full grid-cols-9 gap-1">
                  <input
                    name="type"
                    type="text"
                    value={course.type}
                    onChange={e => handleChange(e, course.id ?? index)}
                    className="bg-secondary col-span-1 rounded-sm p-2 text-base font-semibold text-white"
                  />
                  <div className="text-primary col-span-4 flex text-xl">
                    &quot;
                    <input
                      name="title"
                      type="text"
                      value={course.title}
                      onChange={e => handleChange(e, course.id ?? index)}
                      className="bg-secondary grow rounded-sm p-2 text-base font-semibold text-white"
                    />
                    &quot;
                  </div>
                  <input
                    name="institution"
                    type="text"
                    value={course.institution}
                    onChange={e => handleChange(e, course.id ?? index)}
                    className="bg-secondary col-span-2 rounded-sm p-2 text-base font-semibold text-white"
                  />
                  <input
                    type="checkbox"
                    name="inCourse"
                    checked={course.inCourse}
                    onChange={e => handleChange(e, course.id ?? index)}
                    className="bg-secondary col-span-1 rounded-sm p-2 text-base font-semibold text-white"
                  />
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemove(course.id ?? index)}
                  >
                    <BiTrash />
                  </button>
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
  )
}
