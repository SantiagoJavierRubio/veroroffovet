import Layout from '@/components/Layout/Layout'
import Expandable from '@/components/Expandable'
import styles from '../../styles/Asesorias.module.css'
import Link from 'next/link'
import Container from '@/components/Container'
import { prisma } from '@/prisma/client'
import { Price } from '.prisma/client'

const CommonDetails = () => {
  return (
    <>
      <p className="my-4 px-4 text-base italic text-red-400">
        * En pacientes con patologías se aconsejan controles periódicos hasta la
        estabilización de la misma. La frecuencia dependerá de cada caso.
      </p>
      <p className="my-4 px-4 text-base italic text-red-400">
        * Para cachorros, debido a su velocidad de crecimiento muy rápida, es
        necesario hacer reformulaciones de la dieta hasta que lleguen a edad
        adulta. La frecuencia de las mismas dependerá de la edad y talla del
        animal (será evaluado en la consulta)
      </p>
    </>
  )
}

const BottomLink = () => (
  <div className="flex justify-center">
    <a href="#bottom-remarks" className="font-bold text-blue-500 underline">
      Me interesa {'>'}
    </a>
  </div>
)

export interface Honorarios {
  asesorias?: number
  suplementacion?: number
  asesoriasControl?: number
  suplementacionControl?: number
  domicilio?: number
}

function parsePrice(price: number | undefined) {
  if (price !== undefined) return `$${price}`
  else
    return (
      <span className="text-base font-normal italic text-red-500">
        (precio no disponible momentaneamente)
      </span>
    )
}

export default function Asesorias({ prices }: { prices: Price[] }) {
  const honorarios: Honorarios = Object.fromEntries(
    prices.map(p => {
      return [p.title, p.value]
    })
  )
  return (
    <Layout title="Asesorías nutricionales">
      <h1 className="text-primary mt-8 text-center text-5xl font-bold sm:text-6xl">
        Asesorías nutricionales
      </h1>
      <Container>
        <h2 className="text-primary mt-6 text-xl font-bold sm:px-4 sm:text-2xl">
          Tipos de dietas para caninos y felinos
          <span className="hidden sm:!inline">:</span>
        </h2>
        <ul className={styles.dietList}>
          <li className={styles.listElement}>
            <Expandable title="Dieta BARF">
              <p className={styles.dietDescription}>
                Sus siglas significan “Biologically Appropiate Raw Food”, en
                castellano “Alimentación Cruda Biológicamente Apropiada” (ACBA).
                <br /> Consiste en una dieta cruda que intenta imitar lo más
                posible la presa que nuestros carnívoros a cargo consumirían en
                la naturaleza. Animales con ciertas patologías diagnosticadas o
                que convivan con humanos inmunosuprimidos pueden no ser aptos
                para una dieta BARF
              </p>
              <div className={styles.dietDetails}>
                <h4>Incluye:</h4>
                <ul>
                  <li>Consulta por videollamada</li>
                  <li>Archivo PDF con la dieta</li>
                  <li>Guía de transición hacia la nueva dieta</li>
                  <li>
                    Recetas útiles, listado de suplementos, cortes de carne
                    económicos, etc
                  </li>
                  <li>
                    Seguimiento vía mail durante 30 días para despejar dudas que
                    surjan durante el proceso
                  </li>
                </ul>
                <h4>Honorarios:</h4>
                <p className={styles.price}>
                  {parsePrice(honorarios.asesorias)}
                </p>
                <p className={styles.priceDetail}>
                  Si por algún motivo el acompañamiento inicial superara el mes,
                  se deberá abonar un control de{' '}
                  {parsePrice(honorarios.asesoriasControl)}
                </p>
                <p className={styles.priceDetail}>
                  En pacientes sanos se aconseja un control a los 6 meses y
                  luego controles anuales
                </p>
                <CommonDetails />
              </div>
              <BottomLink />
            </Expandable>
          </li>
          <li className={styles.listElement}>
            <Expandable title="Dieta natural cocida">
              <p className={styles.dietDescription}>
                Para todo tipo de animales (humanos y no humanos). Consiste en
                una dieta adecuada para un carnívoro pero, a diferencia de la
                dieta BARF, es cocida. Cada dieta para cada animal es distinta y
                se formula en base a sus condiciones de vida y de salud,
                adecuada a sus requerimientos
              </p>
              <div className={styles.dietDetails}>
                <h4>Incluye:</h4>
                <ul>
                  <li>Consulta por videollamada</li>
                  <li>Archivo PDF con la dieta</li>
                  <li>Guía de transición hacia la nueva dieta</li>
                  <li>
                    Recetas útiles, listado de suplementos, cortes de carne
                    económicos, etc
                  </li>
                  <li>
                    Seguimiento vía mail durante 30 dias para despejar dudas que
                    surjan durante el proceso
                  </li>
                </ul>
                <h4>Honorarios:</h4>
                <p className={styles.price}>
                  {parsePrice(honorarios.asesorias)}
                </p>
                <p className={styles.priceDetail}>
                  Si por algún motivo el acompanamiento inicial superara el mes,
                  se deberá abonar un control de{' '}
                  {parsePrice(honorarios.asesoriasControl)}
                </p>
                <p className={styles.priceDetail}>
                  En pacientes sanos se aconseja un control a los 6 meses y
                  luego controles anuales
                </p>
                <CommonDetails />
              </div>
              <BottomLink />
            </Expandable>
          </li>
          <li className={styles.listElement}>
            <Expandable title="Dieta mixta">
              <p className={styles.dietDescription}>
                Consiste en proporcionar parte de la dieta en forma de
                alimentación natural cocida y otra parte en forma de alimento
                ultraprocesado. Muchas veces se presentan miedos o inseguridades
                a la hora de cambiar la alimentación de nuestros compañeros
                carnívoros, ésta es una buena forma de empezar y probar cómo se
                sienten durante el proceso
              </p>
              <div className={styles.dietDetails}>
                <h4>Incluye:</h4>
                <ul>
                  <li>Consulta por videollamada</li>
                  <li>
                    Evaluación del ultraprocesado actual y, de ser necesario,
                    recomendación de otras opciones
                  </li>
                  <li>Archivo PDF con la dieta</li>
                  <li>Guía de transición hacia la nueva dieta</li>
                  <li>
                    Recetas útiles, listado de suplementos, cortes de carne
                    económicos, etc
                  </li>
                  <li>
                    Seguimiento vía mail durante 30 dias para despejar dudas que
                    surjan durante el proceso
                  </li>
                </ul>
                <h4>Honorarios:</h4>
                <p className={styles.price}>
                  {parsePrice(honorarios.asesorias)}
                </p>
                <p className={styles.priceDetail}>
                  Si por algún motivo el acompanamiento inicial superara el mes,
                  se deberá abonar un control de{' '}
                  {parsePrice(honorarios.asesoriasControl)}
                </p>
                <p className={styles.priceDetail}>
                  En pacientes sanos se aconseja un control a los 6 meses y
                  luego controles anuales
                </p>
                <CommonDetails />
              </div>
              <BottomLink />
            </Expandable>
          </li>
          <li className={styles.listElement}>
            <Expandable title="Suplementación de ultraprocesados">
              <p className={styles.dietDescription}>
                Son muchos los motivos por los cuales no queremos cambiar a una
                alimentación natural, pero sí queremos mejorar la calidad del
                alimento que les ofrecemos a diario. Incorporando pequeños
                cambios como el agregado de suplementos específicos según cada
                caso estamos mejorando muchísimo su calidad de vida
              </p>
              <div className={styles.dietDetails}>
                <h4>Incluye:</h4>
                <ul>
                  <li>Consulta por videollamada</li>
                  <li>
                    Evaluación del ultraprocesado actual y, de ser necesario,
                    recomendación de otras opciones
                  </li>
                  <li>Listado de suplementos</li>
                  <li>Recetas útiles</li>
                  <li>
                    Seguimiento vía mail por 7 días para despejar dudas que
                    surjan durante el proceso
                  </li>
                </ul>
                <h4>Honorarios:</h4>
                <p className={styles.price}>
                  {parsePrice(honorarios.suplementacion)}
                </p>
                <p className={styles.priceDetail}>
                  Si por algún motivo el acompanamiento inicial superara los 7
                  días, se deberá abonar un control de{' '}
                  {parsePrice(honorarios.suplementacionControl)}
                </p>
              </div>
              <BottomLink />
            </Expandable>
          </li>
        </ul>
        <article>
          <h3
            id="bottom-remarks"
            className="text-primary my-6 text-center text-4xl font-bold underline"
          >
            Consideraciones generales
          </h3>
          <div className={styles.generalRemarks}>
            <p>
              Si bien para los pacientes con patologías contar con análisis
              complementarios es una condición, es aconsejable realizar en todos
              los pacientes un chequeo sanguíneo y de orina básicos previos a la
              consulta
            </p>
            <p>
              El plan nutricional elegido será entregado vía mail dentro de los
              7 días hábiles luego de la consulta. A partir de que se entrega el
              material, corren los días de seguimiento correspondientes al plan
            </p>
            <p>
              Los honorarios establecidos son por animal. En caso de más de uno,
              se realiza un descuento que se establece según cada situación
              (especies, edades, estados de salud, etc.)
            </p>
            <p>
              Medios de pago: Transferencia bancaria o Mercadopago. Fuera de
              Argentina: Paypal
            </p>
            <p>
              Días y horarios para las consultas durante el seguimiento: de
              lunes a viernes de 9 a 19 hs
            </p>
          </div>
        </article>
        <div className="mt-6 flex w-full justify-center">
          <Link
            href="/asesorias/formulario"
            className="pointer-events-none m-auto cursor-not-allowed opacity-50"
          >
            <button className="bg-secondary active:bg-secondary/90 m-auto max-w-full rounded-lg p-6 text-2xl font-bold text-stone-50 shadow-none outline-none transition-all duration-75 hover:-translate-y-px hover:shadow-black/60 hover:drop-shadow-xl hover:duration-75 active:translate-y-0 active:scale-100 active:shadow-inner">
              Solicitar una asesoría
            </button>
          </Link>
        </div>
        <h6 className="text-primary mt-12 text-center text-xl">
          ¿Ya realizaste una asesoría?{' '}
          <span className="hover:text-secondary underline">
            <Link href="/asesorias/opinion">Dejame tu opinión</Link>
          </span>
        </h6>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const prices = await prisma.price.findMany({
      select: { title: true, value: true }
    })
    return {
      props: {
        prices
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        prices: []
      }
    }
  }
}
