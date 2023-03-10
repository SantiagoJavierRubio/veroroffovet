import Layout from '@/components/Layout/Layout'
import Container from '@/components/Container'
import ImageDisplayer from '@/components/ImageDisplayer'

export default function Recursos() {
  return (
    <Layout title="Recursos">
      <Container>
        <h2 className="text-primary mb-4 text-3xl font-bold underline">
          Cursos:
        </h2>
        <ul>
          <li>
            <h3 className="text-primary text-center text-2xl font-semibold">
              Cómo elegir un ultraprocesado
            </h3>
            <div className="border-terciary w-full rounded-lg sm:border-2">
              <div>
                <h6 className="text-secondary text-center text-xl">
                  Información
                </h6>
                <div className="m-auto w-full max-w-sm">
                  <ImageDisplayer
                    imageList={new Array(14)
                      .fill('')
                      .map((_, i) => `/resources/curso_1/${i + 1}.png`)}
                  />
                </div>
              </div>
              <div className="text-secondary p-8 text-center text-xl font-bold underline">
                <a
                  href="https://forms.gle/4fkZRwrrfKnEstk36"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link de inscripción
                </a>
              </div>
            </div>
          </li>
        </ul>
      </Container>
    </Layout>
  )
}
