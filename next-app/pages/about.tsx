import Layout from '@/components/Layout/Layout'
import Container from '@/components/Container'

// TODO: agregar estilos

export default function About() {
  return (
    <Layout title="Sobre mi">
      <h1 className="text-primary text-center text-6xl font-bold">Sobre mi</h1>
      <Container>
        <div>
          <h3>Mi nombre es Veronica Roffo</h3>
          {/*TODO: foto */}
        </div>
        <p>
          Me recibí en el año 2019 de Veterinaria en la Universidad de Buenos
          Aires y desde entonces trabajo apasionadamente con animales grandes y
          pequeños
        </p>
        <p>
          Me especializo en nutricion de felinos y caninos, atendiendo casos
          clinicos y brindando soluciones para mejorar las dietas de mis
          pacientes
        </p>
        <p>
          Ademas de las asesorias realizo divulgacion de buenas practicas y
          recomendaciones para la nutricion animal en{' '}
          <a
            href="https://www.instagram.com/vr.veterinaria/"
            target="_blank"
            rel="noopener noreferrer"
          >
            mi instagram
          </a>
        </p>
        <p>
          Para estar siempre actualizada en este tema que tanto me apasiona, he
          realizado y realizo muchos cursos y capacitaciones. Entre ellos:
          <ul>
            {/*TODO: Agregar links a las pags de los cursos? Certificados?*/}
            <li>
              Máster “Alimentación natural y nutrición funcional para perros y
              gatos” - Biovet
            </li>
            <li>
              Curso “Nutrición natural en caninos y felinos domésticos” - Red
              Animal Chile
            </li>
            <li>
              Curso “Nutrición natural de mascotas y taller de patologías” -
              Christian Vergara
            </li>
            {/* Mas?? */}
          </ul>
        </p>
        <p></p>
      </Container>
    </Layout>
  )
}
