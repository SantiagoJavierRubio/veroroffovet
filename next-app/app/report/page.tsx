import Container from '@/components/Container'
import { ReportForm } from './_components/ReportForm'

export default function Report() {
  return (
    <Container>
      <h2 className="text-primary m-4 text-center text-3xl font-bold">
        ¡Lamento que algo no haya funcionado como esperabas!
      </h2>
      <ReportForm />
    </Container>
  )
}
