import Container from '@/components/Container'
import Layout from '@/components/Layout/Layout'
import { useState, ChangeEvent, FormEvent } from 'react'
import { useSession } from 'next-auth/react'
import SendButton from '@/components/SendButton'
import { Barrio } from '.prisma/client'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'
import {
  MdDeleteForever,
  MdRestoreFromTrash,
  MdAddCircle
} from 'react-icons/md'
import { useBarrios } from '@/api/admin/barrios'

const DEFAULT_BARRIO: Barrio = {
  name: '',
  distritoName: 'caba'
}

export default function BarriosPage() {
  const { data: session, status } = useSession()
  const { get, post } = useBarrios()
  const [newInput, setNewInput] = useState<Barrio>(DEFAULT_BARRIO)
  const [inputs, setInputs] = useState<Barrio[]>([])
  const [toDelete, setToDelete] = useState<string[]>([])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    post.mutate({
      toAdd: inputs,
      toDelete
    })
    setInputs([])
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewInput(prev => ({ ...prev, name: e.target.value }))
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewInput(prev => ({ ...prev, distritoName: e.target.value }))
  }
  const inputExists = !!(
    !newInput.name ||
    [...get.data, ...inputs].find(
      i => i.name.toLowerCase() === newInput.name.toLowerCase()
    )
  )

  const addInput = () => {
    if (inputExists) return
    setInputs(prev => [...prev, newInput])
    setNewInput(DEFAULT_BARRIO)
  }

  const handleRemoveInput = (barrio: Barrio) => {
    setInputs(prev => prev.filter(b => b.name !== barrio.name))
  }

  const handleDeleteButtonAction = (value: string) => {
    if (toDelete.includes(value))
      setToDelete(prev => prev.filter(val => val != value))
    else setToDelete(prev => [...prev, value])
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
          Editar barrios
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
                <div className="grid grid-cols-2 gap-0">
                  {get.data.map(barrio => (
                    <div
                      className="m-auto my-2 flex items-center gap-2 sm:w-3/5"
                      key={barrio.name}
                    >
                      <p
                        className={
                          toDelete.includes(barrio.name)
                            ? 'text-primary/50'
                            : 'text-primary'
                        }
                      >
                        {barrio.name}
                        {` (${barrio.distritoName})`}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleDeleteButtonAction(barrio.name)}
                      >
                        {toDelete.includes(barrio.name) ? (
                          <MdRestoreFromTrash
                            size={20}
                            className="text-primary"
                          />
                        ) : (
                          <MdDeleteForever size={20} className="text-red-500" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
                <hr className="border-primary mx-auto my-2 w-1/3" />
                {inputs.length > 0 && (
                  <h4 className="text-primary text-center underline">Nuevos</h4>
                )}
                {inputs.map(barrio => (
                  <div
                    className="m-auto my-2 flex w-full max-w-full items-center justify-center gap-2 sm:w-3/5"
                    key={barrio.name}
                  >
                    <p className="text-primary">
                      {barrio.name}
                      {` (${barrio.distritoName})`}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemoveInput(barrio)}
                    >
                      <MdDeleteForever size={20} className="text-red-500" />
                    </button>
                  </div>
                ))}
                <div className="m-auto my-2 flex w-full max-w-full items-center justify-center gap-2 sm:w-3/5">
                  <input
                    name="type"
                    type="text"
                    placeholder="Nuevo barrio"
                    value={newInput.name}
                    onChange={handleChange}
                    className="bg-secondary col-span-1 rounded-sm p-2 text-base font-semibold text-white placeholder:font-normal placeholder:italic placeholder:text-gray-300"
                  />
                  <select
                    onChange={handleSelectChange}
                    className="bg-secondary rounded-sm p-2 text-white"
                  >
                    <option
                      value="caba"
                      selected={newInput.distritoName === 'caba'}
                    >
                      Caba
                    </option>
                    <option
                      value="provincia"
                      selected={newInput.distritoName === 'provincia'}
                    >
                      Provincia
                    </option>
                  </select>
                  <button
                    type="button"
                    disabled={inputExists}
                    onClick={addInput}
                    className="text-primary disabled:text-gray-500"
                  >
                    <MdAddCircle size={26} />
                  </button>
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
    </Layout>
  )
}
