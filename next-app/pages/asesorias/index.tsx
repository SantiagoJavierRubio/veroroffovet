import Layout from "@/components/Layout/Layout"
import Expandable from "@/components/Expandable"
import styles from "../../styles/Asesorias.module.css";

export default function Asesorias() {
  return (
    <Layout title="Asesorias nutricionales">
        <h1 className="text-primary text-6xl mt-8 text-center font-extrabold">Asesorias nutricionales</h1>
        <h2 className="text-black text-2xl px-4 mt-6 font-bold">Tipos de dietas para caninos y felinos:</h2>
        <ul className="flex flex-col gap-4">
          <li className={styles.listElement}>
            <Expandable title="Dieta BARF">
              <p className={styles.dietDescription}>
                Sus siglas significan “Biologically Appropiate Raw Food”, en castellano “Alimentación Cruda
                Biologicamente Apropiada” (ACBA).<br /> Consiste en una dieta cruda que intenta imitar lo mas posible la 
                presa que nuestros carnívoros a cargo consumirían en la naturaleza. 
                Animales con ciertas patologías diagnosticadas y humanos inmunosuprimidos pueden no ser aptos para
                una dieta BARF.
              </p>
              <div className={styles.dietDetails}>
                <h4>Incluye:</h4>
                <ul>
                  <li>Consulta por videollamada</li>
                  <li>Archivo PDF con la dieta</li>
                  <li>Guia de transicion hacia la nueva dieta</li>
                  <li>Recetas utiles, listado de suplementos, cortes de carne economicos, etc</li>
                  <li>Seguimiento via mail durante 30 dias para despejar dudas que surjan durante el proceso</li>
                </ul>
                <h4>Honorarios:</h4>
                <p className={styles.price}>$6500</p>
                <p className={styles.priceDetail}>Si por algun motivo el acompanamiento inicial supera el mes, se debera abonar un control de $3000</p>
                <p className={styles.priceDetail}>En pacientes sanos se aconseja un control a los 6 meses y luego controles anuales</p>
              </div>
            </Expandable>
          </li>
          <li className={styles.listElement}>
            <Expandable title="Dieta natural cocida">
              <p className={styles.dietDescription}>
                Para todo tipo de animales (humanos y no humanos). Consiste en una dieta 
                adecuada para un carnívoro pero, a diferencia de la dieta BARF, es cocida. Cada dieta para cada animal 
                es distinta y se formula en base a sus condiciones de vida y de salud, adecuada a sus requerimientos.
              </p>
              <div className={styles.dietDetails}>
                <h4>Incluye:</h4>
                <ul>
                  <li>Consulta por videollamada</li>
                  <li>Archivo PDF con la dieta</li>
                  <li>Guia de transicion hacia la nueva dieta</li>
                  <li>Recetas utiles, listado de suplementos, cortes de carne economicos, etc</li>
                  <li>Seguimiento via mail durante 30 dias para despejar dudas que surjan durante el proceso</li>
                </ul>
                <h4>Honorarios:</h4>
                <p className={styles.price}>$6500</p>
                <p className={styles.priceDetail}>Si por algun motivo el acompanamiento inicial supera el mes, se debera abonar un control de $3000</p>
                <p className={styles.priceDetail}>En pacientes sanos se aconseja un control a los 6 meses y luego controles anuales</p>
              </div>
            </Expandable>
          </li>
          <li className={styles.listElement}>
            <Expandable title="Dieta mixta">
              <p className={styles.dietDescription}>
                Consiste en proporcionar parte de la dieta en forma de alimentación natural cocida y otra 
                parte en forma de alimento ultraprocesado. Muchas veces se presentan miedos o inseguridades a la 
                hora de cambiar la alimentación de nuestros compañeros carnívoros, esta es una buena forma de 
                empezar y probar cómo se sienten durante el proceso.
              </p>
              <div className={styles.dietDetails}>
                <h4>Incluye:</h4>
                <ul>
                  <li>Consulta por videollamada</li>
                  <li>Evaluacion del ultraprocesado actual y, de ser necesario, recomendacion de otras opciones</li>
                  <li>Archivo PDF con la dieta</li>
                  <li>Guia de transicion hacia la nueva dieta</li>
                  <li>Recetas utiles, listado de suplementos, cortes de carne economicos, etc</li>
                  <li>Seguimiento via mail durante 30 dias para despejar dudas que surjan durante el proceso</li>
                </ul>
                <h4>Honorarios:</h4>
                <p className={styles.price}>$6500</p>
                <p className={styles.priceDetail}>Si por algun motivo el acompanamiento inicial supera el mes, se debera abonar un control de $3000</p>
                <p className={styles.priceDetail}>En pacientes sanos se aconseja un control a los 6 meses y luego controles anuales</p>
              </div>
            </Expandable>
          </li>
          <li className={styles.listElement}>
            <Expandable title="Suplementacion de ultraprocesados">
              <p className={styles.dietDescription}>
                Son muchos los motivos por los cuales no queremos cambiar a 
                una alimentación natural, pero sí queremos mejorar la calidad del alimento que les ofrecemos a diario. 
                Incorporando pequeños cambios como el agregado de suplementos específicos según cada caso 
                estamos mejorando muchísimo su calidad de vida.
              </p>
              <div className={styles.dietDetails}>
                <h4>Incluye:</h4>
                <ul>
                  <li>Consulta por videollamada</li>
                  <li>Evaluacion del ultraprocesado actual y, de ser necesario, recomendacion de otras opciones</li>
                  <li>Listado de suplementos</li>
                  <li>Recetas utiles</li>
                  <li>Seguimiento via mail por 7 dias para despejar dudas que surjan durante el proceso</li>
                </ul>
                <h4>Honorarios:</h4>
                <p className={styles.price}>$4500</p>
                <p className={styles.priceDetail}>Si por algun motivo el acompanamiento inicial supera los 7 dias, se debera abonar un control de $2000</p>
              </div>
            </Expandable>
          </li>
        </ul>
    </Layout>
  )
}
