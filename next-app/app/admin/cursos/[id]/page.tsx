import Container from '@/app/_components/common/Container'
import { prisma } from '@/prisma/client'
import React from 'react'

export default async function Course({ params }: { params: { id: string } }) {
  const { id } = params
  const course = await prisma.course.findUniqueOrThrow({ where: { id } })
  return (
    <Container className="m-auto flex w-full min-w-0 max-w-xl flex-col gap-4 p-1 sm:p-6">
      <h1 className="text-primary text-center text-3xl font-bold">
        Editando {course.name}
      </h1>
      <form className="flex w-full flex-col items-stretch gap-4">
        <input
          type="text"
          required
          id="name"
          name="name"
          defaultValue={course.name}
        />
        <textarea
          id="description"
          name="description"
          defaultValue={course.description || undefined}
        />
        {/* <input
          type="file"
          accept="image/*"
          id="image"
          name="image"
          onChange={handleFileChange}
        />
        <input
          type="file"
          id="attachment"
          name="attachment"
          onChange={handleFileChange}
        /> */}
        <input
          type="text"
          id="url"
          name="url"
          defaultValue={course.url || undefined}
        />
        <input
          type="checkbox"
          id="enabled"
          name="enabled"
          defaultChecked={course.enabled}
        />
        <button
          type="submit"
          className="bg-primary m-auto w-1/3 min-w-min rounded-md p-4 font-bold"
        >
          Guardar
        </button>
      </form>
    </Container>
  )
}
