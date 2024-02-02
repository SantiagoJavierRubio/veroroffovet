'use client'

import Container from '@/app/_components/common/Container'
import { type FormEvent } from 'react'
import SendButton from '@/app/_components/common/SendButton'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'
import { useHonorarios } from '@/app/_queries/admin/honorarios'
import { editHonorarios } from '@/app/_lib/schemas/honorarios'
import useFormErrors from '@/app/_hooks/useFormErrors'
import { BiLoaderAlt } from 'react-icons/bi'
import useAdminSession from '@/app/_hooks/sessions/useAdminSession'

export default function HonorariosPage() {
  const { adminUser, status } = useAdminSession()
  const { get, post } = useHonorarios()
  const { errors, parseErrors } = useFormErrors(editHonorarios)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const values = new FormData(e.currentTarget)
    const valuesObj = Object.fromEntries(values)
    if (parseErrors(valuesObj)) {
      const inputs = editHonorarios.parse(valuesObj)
      post.mutate(inputs)
    }
  }

  return (
    <Container>
      <Link href="/admin" className="absolute top-0 left-0">
        <button className="text-secondary flex items-center justify-start">
          <FaChevronLeft /> Volver
        </button>
      </Link>
      <h1 className="text-primary text-center text-3xl font-bold">
        Editar honorarios
      </h1>
      {get.isLoading || status === 'loading' ? (
        <div className="text-primary mt-14 text-center text-2xl font-bold">
          <BiLoaderAlt size={36} className="m-auto animate-spin" />
        </div>
      ) : (
        <>
          {!adminUser ? (
            <div className="m-auto text-center text-2xl font-bold text-red-500">
              Unauthorized
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-1 sm:p-2"
            >
              <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
                <label
                  className="text-primary pl-1 font-bold"
                  htmlFor="asesorias"
                >
                  Asesorias
                </label>
                <input
                  defaultValue={get.data?.asesorias}
                  className="bg-secondary rounded-sm p-2 pl-5 font-semibold text-white"
                  type="number"
                  name="asesorias"
                  id="asesorias"
                />
                <p
                  className={`text-red-500 ${
                    errors?.asesorias ? 'block' : 'hidden'
                  }`}
                >
                  {errors?.asesorias?._errors[0]}
                </p>
              </div>
              <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
                <label
                  className="text-primary pl-1 font-bold"
                  htmlFor="asesoriasControl"
                >
                  Control asesorias
                </label>
                <input
                  defaultValue={get.data?.asesoriasControl}
                  className="bg-secondary rounded-sm p-2 pl-5 font-semibold text-white"
                  type="number"
                  name="asesoriasControl"
                  id="asesoriasControl"
                />
                <p
                  className={`text-red-500 ${
                    errors?.asesoriasControl ? 'block' : 'hidden'
                  }`}
                >
                  {errors?.asesoriasControl?._errors[0]}
                </p>
              </div>
              <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
                <label
                  className="text-primary pl-1 font-bold"
                  htmlFor="suplementacion"
                >
                  Suplementacion
                </label>
                <input
                  defaultValue={get.data?.suplementacion}
                  className="bg-secondary rounded-sm p-2 pl-5 font-semibold text-white"
                  type="number"
                  name="suplementacion"
                  id="suplementacion"
                />
                <p
                  className={`text-red-500 ${
                    errors?.suplementacion ? 'block' : 'hidden'
                  }`}
                >
                  {errors?.suplementacion?._errors[0]}
                </p>
              </div>
              <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
                <label
                  className="text-primary pl-1 font-bold"
                  htmlFor="suplementacionControl"
                >
                  Control suplementacion
                </label>
                <input
                  defaultValue={get.data?.suplementacionControl}
                  className="bg-secondary rounded-sm p-2 pl-5 font-semibold text-white"
                  type="number"
                  name="suplementacionControl"
                  id="suplementacionControl"
                />
                <p
                  className={`text-red-500 ${
                    errors?.suplementacionControl ? 'block' : 'hidden'
                  }`}
                >
                  {errors?.suplementacionControl?._errors[0]}
                </p>
              </div>
              <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
                <label
                  className="text-primary pl-1 font-bold"
                  htmlFor="domicilio"
                >
                  Costo a domicilio
                </label>
                <input
                  defaultValue={get.data?.domicilio}
                  className="bg-secondary rounded-sm p-2 pl-5 font-semibold text-white"
                  type="number"
                  name="domicilio"
                  id="domicilio"
                />
                <p
                  className={`text-red-500 ${
                    errors?.domicilio ? 'block' : 'hidden'
                  }`}
                >
                  {errors?.domicilio?._errors[0]}
                </p>
              </div>
              <div className="m-auto my-4 flex max-w-sm justify-center">
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
