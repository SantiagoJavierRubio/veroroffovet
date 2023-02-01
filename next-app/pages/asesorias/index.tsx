import Layout from '@/components/Layout/Layout'
import Expandable from '@/components/Expandable'
import styles from '../../styles/Asesorias.module.css'
import Link from 'next/link'

const CommonDetails = () => {
  return (
    <>
      <p className="my-4 px-4 text-base italic text-red-500">
        * En pacientes con patologias se aconsejan controles periodicos hasta la
        estabilizacion de la misma. La frecuencia dependera de cada caso.
      </p>
      <p className="my-4 px-4 text-base italic text-red-500">
        * Para cachorros, debido a su velocidad de crecimiento muy rapida, es
        necesario hacer reformulaciones de la dieta hasta que lleguen a edad
        adulta. La frecuencia de las mismas dependera de la edad y tala del
        animal (sera evaluado en la consulta)
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

export default function Asesorias() {
  return (
    <Layout title="Asesorias nutricionales">
      <h1 className="mt-8 text-center text-6xl font-extrabold text-primary">
        Asesorias nutricionales
      </h1>
      <h2 className="mt-6 px-4 text-2xl font-bold text-black">
        Tipos de dietas para caninos y felinos:
      </h2>
      <ul className={styles.dietList}>
        <li className={styles.listElement}>
          <Expandable title="Dieta BARF">
            <p className={styles.dietDescription}>
              Sus siglas significan “Biologically Appropiate Raw Food”, en
              castellano “Alimentación Cruda Biologicamente Apropiada” (ACBA).
              <br /> Consiste en una dieta cruda que intenta imitar lo mas
              posible la presa que nuestros carnívoros a cargo consumirían en la
              naturaleza. Animales con ciertas patologías diagnosticadas y
              humanos inmunosuprimidos pueden no ser aptos para una dieta BARF.
            </p>
            <div className={styles.dietDetails}>
              <h4>Incluye:</h4>
              <ul>
                <li>Consulta por videollamada</li>
                <li>Archivo PDF con la dieta</li>
                <li>Guia de transicion hacia la nueva dieta</li>
                <li>
                  Recetas utiles, listado de suplementos, cortes de carne
                  economicos, etc
                </li>
                <li>
                  Seguimiento via mail durante 30 dias para despejar dudas que
                  surjan durante el proceso
                </li>
              </ul>
              <h4>Honorarios:</h4>
              <p className={styles.price}>$6500</p>
              <p className={styles.priceDetail}>
                Si por algun motivo el acompanamiento inicial supera el mes, se
                debera abonar un control de $3000
              </p>
              <p className={styles.priceDetail}>
                En pacientes sanos se aconseja un control a los 6 meses y luego
                controles anuales
              </p>
              <CommonDetails />
            </div>
            <BottomLink />
          </Expandable>
        </li>
        <li className={styles.listElement}>
          <Expandable title="Dieta natural cocida">
            <p className={styles.dietDescription}>
              Para todo tipo de animales (humanos y no humanos). Consiste en una
              dieta adecuada para un carnívoro pero, a diferencia de la dieta
              BARF, es cocida. Cada dieta para cada animal es distinta y se
              formula en base a sus condiciones de vida y de salud, adecuada a
              sus requerimientos.
            </p>
            <div className={styles.dietDetails}>
              <h4>Incluye:</h4>
              <ul>
                <li>Consulta por videollamada</li>
                <li>Archivo PDF con la dieta</li>
                <li>Guia de transicion hacia la nueva dieta</li>
                <li>
                  Recetas utiles, listado de suplementos, cortes de carne
                  economicos, etc
                </li>
                <li>
                  Seguimiento via mail durante 30 dias para despejar dudas que
                  surjan durante el proceso
                </li>
              </ul>
              <h4>Honorarios:</h4>
              <p className={styles.price}>$6500</p>
              <p className={styles.priceDetail}>
                Si por algun motivo el acompanamiento inicial supera el mes, se
                debera abonar un control de $3000
              </p>
              <p className={styles.priceDetail}>
                En pacientes sanos se aconseja un control a los 6 meses y luego
                controles anuales
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
              ultraprocesado. Muchas veces se presentan miedos o inseguridades a
              la hora de cambiar la alimentación de nuestros compañeros
              carnívoros, esta es una buena forma de empezar y probar cómo se
              sienten durante el proceso.
            </p>
            <div className={styles.dietDetails}>
              <h4>Incluye:</h4>
              <ul>
                <li>Consulta por videollamada</li>
                <li>
                  Evaluacion del ultraprocesado actual y, de ser necesario,
                  recomendacion de otras opciones
                </li>
                <li>Archivo PDF con la dieta</li>
                <li>Guia de transicion hacia la nueva dieta</li>
                <li>
                  Recetas utiles, listado de suplementos, cortes de carne
                  economicos, etc
                </li>
                <li>
                  Seguimiento via mail durante 30 dias para despejar dudas que
                  surjan durante el proceso
                </li>
              </ul>
              <h4>Honorarios:</h4>
              <p className={styles.price}>$6500</p>
              <p className={styles.priceDetail}>
                Si por algun motivo el acompanamiento inicial supera el mes, se
                debera abonar un control de $3000
              </p>
              <p className={styles.priceDetail}>
                En pacientes sanos se aconseja un control a los 6 meses y luego
                controles anuales
              </p>
              <CommonDetails />
            </div>
            <BottomLink />
          </Expandable>
        </li>
        <li className={styles.listElement}>
          <Expandable title="Suplementacion de ultraprocesados">
            <p className={styles.dietDescription}>
              Son muchos los motivos por los cuales no queremos cambiar a una
              alimentación natural, pero sí queremos mejorar la calidad del
              alimento que les ofrecemos a diario. Incorporando pequeños cambios
              como el agregado de suplementos específicos según cada caso
              estamos mejorando muchísimo su calidad de vida.
            </p>
            <div className={styles.dietDetails}>
              <h4>Incluye:</h4>
              <ul>
                <li>Consulta por videollamada</li>
                <li>
                  Evaluacion del ultraprocesado actual y, de ser necesario,
                  recomendacion de otras opciones
                </li>
                <li>Listado de suplementos</li>
                <li>Recetas utiles</li>
                <li>
                  Seguimiento via mail por 7 dias para despejar dudas que surjan
                  durante el proceso
                </li>
              </ul>
              <h4>Honorarios:</h4>
              <p className={styles.price}>$4500</p>
              <p className={styles.priceDetail}>
                Si por algun motivo el acompanamiento inicial supera los 7 dias,
                se debera abonar un control de $2000
              </p>
            </div>
            <BottomLink />
          </Expandable>
        </li>
      </ul>
      <h3
        id="bottom-remarks"
        className="my-6 text-center text-4xl font-bold text-primary underline"
      >
        Consideraciones generales
      </h3>
      <div className={styles.generalRemarks}>
        <p>
          Si bien para los pacientes con patologías contar con análisis
          complementarios es una condición, es aconsejable realizar en todos los
          pacientes un chequeo sanguíneo y de orina básicos previos a la
          consulta
        </p>
        <p>
          El plan nutricional elegido será entregado vía mail dentro de los 7
          días hábiles luego de la consulta. A partir de que se entrega el
          material, corren los días de seguimiento correspondientes al plan.
        </p>
        <p>
          En caso que prefieras una consulta presencial y residas en Capital
          Federal (consultar barrios), Vicente López o Florida, la visita a
          domicilio posee un costo adicional de $1000
        </p>
        <p>
          Los honorarios establecidos son por animal. En caso de más de uno, se
          realiza un descuento que se establece según cada situación (especies,
          edades, estados de salud, etc.).
        </p>
        <p>
          Medios de pago: Transferencia bancaria o Mercadopago. En caso de
          consulta a domicilio, se acepta también efectivo
        </p>
        <p>
          Días y horarios para las consultas durante el seguimiento: de lunes a
          viernes de 9 a 19 hs
        </p>
      </div>
      <div className="mt-6 flex w-full justify-center">
        <Link href="/asesorias/formulario" className="m-auto">
          <button className="max-w-full rounded-lg bg-primary p-6 text-2xl font-bold">
            Solicitar una asesoria
          </button>
        </Link>
      </div>
    </Layout>
  )
}
