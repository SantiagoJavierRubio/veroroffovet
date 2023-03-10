import Container from '@/components/Container'
import Layout from '@/components/Layout/Layout'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Admin() {
  const { data: session, status } = useSession()
  return (
    <Layout>
      <Container>
        <h1 className="text-primary text-center text-3xl font-bold">
          Panel de administración
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
              <div className="mt-6 flex w-full items-center justify-evenly gap-4 p-4">
                <Link href="/admin/honorarios" className="grow">
                  <button className="bg-secondary w-full cursor-pointer rounded-lg p-6 text-2xl font-bold transition-all hover:shadow-lg hover:shadow-stone-500/50 active:shadow-none">
                    Honorarios
                  </button>
                </Link>
                <Link href="/admin/cursos" className="grow">
                  <button className="bg-secondary w-full cursor-pointer rounded-lg p-6 text-2xl font-bold transition-all hover:shadow-lg hover:shadow-stone-500/50 active:shadow-none">
                    Cursos
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </Container>
    </Layout>
  )
}
