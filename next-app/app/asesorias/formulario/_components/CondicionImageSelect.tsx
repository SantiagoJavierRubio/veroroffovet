import { ESPECIES, SEXOS, FormularioData } from './formularioHelpers'
import Image from 'next/image'
import { ChangeEvent } from 'react'
import styles from '../../styles/MultistepForm.module.css'

interface CondicionImageSelectProps {
  graficoPeso: FormularioData['graficoPeso']
  especie: FormularioData['especie']
  sexo: FormularioData['sexo']
  update: (newData: Partial<FormularioData>) => void
}

export default function CondicionImageSelect(props: CondicionImageSelectProps) {
  const { graficoPeso, especie, sexo, update } = props
  const especieVulgar = especie === ESPECIES.GATO ? 'gato' : 'perro'
  const especieSexada =
    sexo === SEXOS.MACHO ? especieVulgar : especieVulgar.replace('o', 'a')

  const folderName = especie === ESPECIES.PERRO ? 'DogProfiles' : 'CatProfiles'

  const handleSelectOption = (e: ChangeEvent<HTMLInputElement>) => {
    update({ graficoPeso: parseInt(e.target.value) })
  }
  return (
    <div className="text-primary m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
      <label htmlFor="graficoPeso" className="font-semibold">
        En que número te parece que está tu {especieSexada}
      </label>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
        <label
          htmlFor="valor1"
          className={`${styles.condicionGraficoOption} ${
            graficoPeso === 1 && styles.condicionChecked
          }`}
        >
          <input
            type="radio"
            id="valor1"
            name="graficoPeso"
            value={1}
            className="hidden"
            checked={graficoPeso === 1}
            onChange={handleSelectOption}
          />
          <Image
            src={`/profiles/${folderName}/1.jpeg`}
            fill
            alt="se le marcan las caderas y costillas"
            className="cursor-pointer"
          />
        </label>
        <label
          htmlFor="valor2"
          className={`${styles.condicionGraficoOption} ${
            graficoPeso === 2 && styles.condicionChecked
          }`}
        >
          <input
            type="radio"
            id="valor2"
            name="graficoPeso"
            value={2}
            className="hidden"
            checked={graficoPeso === 2}
            onChange={handleSelectOption}
          />
          <Image
            src={`/profiles/${folderName}/2.jpeg`}
            fill
            alt="se le marcan las caderas y costillas"
            className="cursor-pointer"
          />
        </label>
        <label
          htmlFor="valor3"
          className={`${styles.condicionGraficoOption} ${
            graficoPeso === 3 && styles.condicionChecked
          }`}
        >
          <input
            type="radio"
            id="valor3"
            name="graficoPeso"
            value={3}
            className="hidden"
            checked={graficoPeso === 3}
            onChange={handleSelectOption}
          />
          <Image
            src={`/profiles/${folderName}/3.jpeg`}
            fill
            alt="se le marcan las caderas y costillas"
            className="cursor-pointer"
          />
        </label>
        <label
          htmlFor="valor4"
          className={`${styles.condicionGraficoOption} ${
            graficoPeso === 4 && styles.condicionChecked
          }`}
        >
          <input
            type="radio"
            id="valor4"
            name="graficoPeso"
            value={4}
            className="hidden"
            checked={graficoPeso === 4}
            onChange={handleSelectOption}
          />
          <Image
            src={`/profiles/${folderName}/4.jpeg`}
            fill
            alt="se le marcan las caderas y costillas"
            className="cursor-pointer"
          />
        </label>
        <label
          htmlFor="valor5"
          className={`${styles.condicionGraficoOption} ${
            graficoPeso === 5 && styles.condicionChecked
          }`}
        >
          <input
            type="radio"
            id="valor5"
            name="graficoPeso"
            value={5}
            className="hidden"
            checked={graficoPeso === 5}
            onChange={handleSelectOption}
          />
          <Image
            src={`/profiles/${folderName}/5.jpeg`}
            fill
            alt="se le marcan las caderas y costillas"
            className="cursor-pointer"
          />
        </label>
      </div>
    </div>
  )
}
