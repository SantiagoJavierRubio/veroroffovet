'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useCourses } from '@/app/_queries/admin/course'
import useAdminSession from '@/app/_hooks/sessions/useAdminSession'

import Container from '@/app/_components/common/Container'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'
import {
  BiLoaderAlt,
  BiEdit,
  BiTrash,
  BiImage,
  BiLink,
  BiFile,
  BiCommentDetail
} from 'react-icons/bi'
import { upsertCourse } from '@/app/_lib/schemas/course'
import { uploadToCloudinary } from '@/app/_queries/admin/uploadToCloudinary'

type Files = {
  image?: File
  attachment?: File
}

export default function Cursos() {
  const { adminUser, status } = useAdminSession()
  const { get, add, remove } = useCourses()
  const [files, setFiles] = useState<Files>({
    image: undefined,
    attachment: undefined
  })

  const handleDelete = (id: string) => {
    if (confirm('Seguro?')) {
      remove.mutate(id)
    }
  }

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

  const uploadFiles = async () => {
    return Promise.all([
      uploadToCloudinary(files.image),
      uploadToCloudinary(files.attachment)
    ])
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const [image, attachment] = await uploadFiles()
    formData.set('image', image?.url ?? '')
    formData.set('attachment', attachment?.url ?? '')
    const parsed = upsertCourse.safeParse(
      Object.fromEntries(formData.entries())
    )
    if (parsed.success) {
      add.mutate(parsed.data)
    } else {
      // TODO: Handle
      console.log(parsed.error)
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
        Cursos ofrecidos
      </h1>
      {get.status === 'pending' || status === 'loading' ? (
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
            <div className="m-auto flex w-full min-w-0 max-w-xl flex-col gap-4 p-1 sm:p-6">
              {get.data?.map(course => (
                <div
                  key={course.id}
                  className={`${
                    course.enabled ? 'bg-secondary/80' : 'bg-gray-500/50'
                  } flex items-center justify-between rounded-sm p-2 md:px-6`}
                >
                  <h6 className="font-bold">{course.name}</h6>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center gap-2 bg-white/20 py-1 px-2">
                      <BiCommentDetail
                        size={20}
                        className={
                          course.description ? 'text-primary' : 'text-white'
                        }
                      />
                      <BiImage
                        size={20}
                        className={course.image ? 'text-primary' : 'text-white'}
                      />
                      <BiFile
                        size={20}
                        className={
                          course.attachment ? 'text-primary' : 'text-white'
                        }
                      />
                      <BiLink
                        size={20}
                        className={course.url ? 'text-primary' : 'text-white'}
                      />
                    </div>
                    <Link href={`/admin/cursos/${course.id}`}>
                      <BiEdit size={28} className="bg-primary rounded-sm p-1" />
                    </Link>
                    <button
                      onClick={() => handleDelete(course.id)}
                      type="button"
                      className="rounded-sm bg-red-500 p-1"
                    >
                      <BiTrash size={20} />
                    </button>
                  </div>
                </div>
              ))}
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col items-stretch gap-4"
              >
                <input type="text" required id="name" name="name" />
                <textarea id="description" name="description" />
                <input
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
                />
                <input type="text" id="url" name="url" />
                <input type="checkbox" id="enabled" name="enabled" />
                <button
                  type="submit"
                  className="bg-primary m-auto w-1/3 min-w-min rounded-md p-4 font-bold"
                >
                  Guardar
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </Container>
  )
}
