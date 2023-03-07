import Layout from '@/components/Layout/Layout'
import Container from '@/components/Container'
import ImageDisplayer from '@/components/ImageDisplayer'

export default function Recursos() {
  return (
    <Layout title="Recursos">
      <Container>
        <div className="m-auto w-full max-w-md">
          <ImageDisplayer imageList={[]} />
        </div>
      </Container>
    </Layout>
  )
}
