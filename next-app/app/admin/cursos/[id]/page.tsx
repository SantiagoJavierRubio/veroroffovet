'use client'

import { type ChangeEvent, type FormEvent, useState } from 'react'
import Image from 'next/image'

import { useCourses } from '@/app/_queries/admin/course'
import { editCourse } from '@/app/_lib/schemas/course'
import { Files, uploadOneFile } from '../utils'

import Container from '@/app/_components/common/Container'
import { MdImageNotSupported } from 'react-icons/md'

export default function Course({ params }: { params: { id: string } }) {
  const { id } = params
  const { getOne, edit } = useCourses(id)
  const [files, setFiles] = useState<Files>({
    image: undefined,
    attachment: undefined
  })

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files = e.target.files
    if ((e.target.name == 'image' || e.target.name == 'attachment') && files) {
      setFiles(prev => ({
        ...prev,
        [e.target.name]: files[0] ?? undefined
      }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!getOne.data?.id) return
    const formData = new FormData(e.currentTarget)
    formData.append('id', getOne.data.id)
    const [image, attachment] = [
      await uploadOneFile(files.image),
      await uploadOneFile(files.attachment)
    ]
    formData.set('image', image?.url ?? getOne.data?.image ?? '')
    formData.set('attachment', attachment?.url ?? getOne.data?.attachment ?? '')
    const parsed = editCourse.safeParse(Object.fromEntries(formData.entries()))
    if (parsed.success) {
      edit.mutate(parsed.data)
    } else {
      // TODO: Handle
      console.log(parsed.error)
    }
  }

  if (getOne.status !== 'success') return <></>
  const course = getOne.data
  return (
    <Container className="m-auto flex w-full min-w-0 max-w-xl flex-col gap-4 p-1 sm:p-6">
      <h1 className="text-primary text-center text-3xl font-bold">
        Editando {course.name}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-stretch gap-6"
      >
        <div className="text-primary flex flex-col gap-1 font-bold">
          <label htmlFor="name">Nombre</label>
          <input
            className="bg-secondary rounded-sm p-2 text-white"
            type="text"
            required
            id="name"
            name="name"
            defaultValue={course.name}
          />
        </div>
        <div className="text-primary flex flex-col gap-1 font-bold">
          <label htmlFor="description">Descripcion</label>
          <textarea
            className="bg-secondary min-h-[3rem] rounded-sm p-2 text-white"
            id="description"
            name="description"
            defaultValue={course.description || undefined}
          />
        </div>
        <div className="text-primary flex flex-col gap-1 font-bold">
          <label htmlFor="image">Imagen</label>
          <div className="relative flex aspect-video w-full items-center justify-center bg-gray-600">
            {course.image ? (
              <Image
                src={course.image}
                alt={course.name}
                fill
                objectFit="contain"
              />
            ) : (
              <MdImageNotSupported size={32} className="text-white" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="m-auto"
          />
        </div>
        <div className="text-primary flex flex-col gap-1 font-bold">
          <label htmlFor="attachment">Adjunto</label>
          {course.attachment && (
            <a
              className="m-auto text-blue-600 underline"
              href={course.attachment}
              download
              target="_blank"
              rel="noreferrer"
            >
              {course.name} info
            </a>
          )}
          <input
            className="m-auto"
            type="file"
            id="attachment"
            name="attachment"
            onChange={handleFileChange}
          />
        </div>
        <div className="text-primary flex flex-col gap-1 font-bold">
          <label htmlFor="url">Link</label>
          <input
            className="bg-secondary rounded-sm p-2 text-white"
            type="text"
            id="url"
            name="url"
            defaultValue={course.url || undefined}
          />
        </div>
        <div className="text-primary flex flex-col gap-1 font-bold">
          <label htmlFor="enabled">Habilitado</label>
          <input
            className="bg-secondary rounded-sm p-2 text-white"
            type="checkbox"
            id="enabled"
            name="enabled"
            defaultChecked={course.enabled}
          />
        </div>
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
