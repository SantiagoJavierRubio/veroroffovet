import Container from '@/components/Container'
import Layout from '@/components/Layout/Layout'
import { useState, ChangeEvent, FormEvent } from 'react'
import { useSession } from 'next-auth/react'
import SendButton from '@/components/SendButton'
import useSendingStatus from '@/hooks/useSendingStatus'
import { PrismaClient } from '@prisma/client'
import { Curso } from '@prisma/client'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'

interface CursosProps {
  courses: Curso[]
}

export default function CursosPage({ courses }: CursosProps) {
  const { data: session, status } = useSession()
  const [inputs, setInputs] = useState<Curso[]>(courses)

  const { sendingStatus, setSendingStatus, SENDING_STATUS } = useSendingStatus()
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSendingStatus(SENDING_STATUS.SENDING)

    fetch('/api/admin/.........', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: '........'
    })
      .then(res => {
        if (res.status === 200) {
          setSendingStatus(SENDING_STATUS.RESPONSE_OK)
        }
        return res.json()
      })
      .then(data => {
        setTimeout(() => setSendingStatus(SENDING_STATUS.NULL), 1500)
      })
      .catch(err => {
        err instanceof Error && setErrorMsg(err.message)
        setSendingStatus(SENDING_STATUS.ERROR)
      })
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
        {status === 'loading' ? (
          <div className="text-primary m-auto animate-pulse text-center text-2xl font-bold">
            Loading...
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
                className="flex flex-col gap-1 sm:p-2"
              >
                {inputs.map(course => (
                  <div key={course.id}>
                    <input
                      name="type"
                      type="text"
                      value={course.type}
                      onChange={e => handleChange(e, course.id)}
                    />
                    <input
                      name="title"
                      type="text"
                      value={course.title}
                      onChange={e => handleChange(e, course.id)}
                    />
                    <input
                      name="institution"
                      type="text"
                      value={course.institution}
                      onChange={e => handleChange(e, course.id)}
                    />
                    <input
                      type="checkbox"
                      name="inCourse"
                      checked={course.inCourse}
                      onChange={e => handleChange(e, course.id)}
                    />
                  </div>
                ))}
                <button type="button" onClick={addNew}>
                  +
                </button>
                <div className="m-auto my-4 flex max-w-sm justify-center">
                  <SendButton
                    sendingStatus={sendingStatus}
                    errorMessage={errorMsg}
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

export async function getServerSideProps() {
  const prisma = new PrismaClient()
  try {
    const courses = await prisma.curso.findMany()
    return {
      props: {
        courses
      }
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        courses: []
      }
    }
  } finally {
    prisma.$disconnect()
  }
}
