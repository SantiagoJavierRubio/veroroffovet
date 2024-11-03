import Layout from '@/components/Layout/Layout'
import Container from '@/components/Container'
import ImageDisplayer from '@/components/ImageDisplayer'
import { v2 as cloudinary } from 'cloudinary'

type ResourceImages = {
  secure_url: string
  filename: string
}[]

export default function Recursos({ images }: { images: ResourceImages }) {
  return (
    <Layout title="Recursos">
      <Container>
        <h2 className="text-primary mb-4 text-2xl font-bold underline sm:text-3xl">
          Cursos:
        </h2>
        <ul>
          <li>
            <h3 className="text-primary px-4 text-center text-xl font-semibold sm:text-2xl">
              Cómo elegir un ultraprocesado y cómo mejorarlo
            </h3>
            <div className="border-terciary w-full rounded-lg sm:border-2">
              <div>
                <h6 className="text-secondary text-center text-lg sm:text-xl">
                  Información
                </h6>
                <div className="m-auto w-full max-w-sm">
                  <ImageDisplayer
                    imageList={images
                      .sort(
                        (a, b) =>
                          Number(a.filename.split('_')[0]) -
                          Number(b.filename.split('_')[0])
                      )
                      .map(im => im.secure_url)}
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

export async function getStaticProps() {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    })
    const { resources } = await cloudinary.search
      .expression('folder:curso_1/*')
      .fields(['secure_url', 'filename'])
      .max_results(50)
      .execute()
    return {
      props: {
        images: resources
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        images: []
      }
    }
  }
}
