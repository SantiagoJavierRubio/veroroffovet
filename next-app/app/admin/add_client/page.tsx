'use client'

import React, { FormEvent } from 'react'
import useAdminSession from '@/app/_hooks/sessions/useAdminSession'
import { useAddClient } from '@/app/_queries/admin/add_client'
import Container from '@/app/_components/common/Container'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'
import { BiLoaderAlt } from 'react-icons/bi'
import SendButton from '@/app/_components/common/SendButton'

export default function AddClient() {
  const { adminUser, status } = useAdminSession()
  const { post } = useAddClient()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    if (email) {
      post
        .mutateAsync(email)
        .then(res => {
          const form = document.getElementById('createUserForm')
          if (form instanceof HTMLFormElement) {
            form.reset()
          }
          if (res.status == 201) alert('Client created')
        })
        .catch(() => {
          setTimeout(() => post.reset(), 900)
        })
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
        Agregar cliente
      </h1>
      {status === 'loading' ? (
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
              id="createUserForm"
              onSubmit={handleSubmit}
              className="text-primary mt-8 flex flex-col items-center gap-4 sm:p-2"
            >
              <div className="flex flex-col items-center">
                <label htmlFor="email" className="text-xl font-bold">
                  Email
                </label>
                <p className="italic">
                  (Una vez realizado este paso el cliente podra ingresar con
                  este correo)
                </p>
              </div>
              <input
                className="bg-secondary col-span-1 m-auto rounded-sm p-2 text-center text-base font-semibold text-white"
                id="email"
                name="email"
                type="email"
                required
              />
              <SendButton
                sendingStatus={post.status}
                errorMessage={post.error?.message}
              />
            </form>
          )}
        </>
      )}
    </Container>
  )
}
