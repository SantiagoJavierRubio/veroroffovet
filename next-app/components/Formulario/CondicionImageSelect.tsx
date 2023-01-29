import { ESPECIES, SEXOS, FormularioData } from "./formularioHelpers"
import Image from "next/image"
import { ChangeEvent } from "react"

interface CondicionImageSelectProps {
    graficoPeso: FormularioData["graficoPeso"]
    especie: FormularioData["especie"]
    sexo: FormularioData["sexo"]
    update: (newData: Partial<FormularioData>) => void
}

export default function CondicionImageSelect(props: CondicionImageSelectProps) {
    const { graficoPeso, especie, sexo, update } = props
    const especieSexada = sexo === SEXOS.MACHO ? especie : especie.replace("o", "a")

    const folderName = especie === ESPECIES.PERRO ? "DogProfiles" : "CatProfiles"

    const handleSelectOption = (e: ChangeEvent<HTMLInputElement>) => {
        update({ graficoPeso: parseInt(e.target.value) })
    }
  return (
    <div>
        <label htmlFor="graficoPeso">En que numero te parece que esta tu {especieSexada}</label>
        <div className="flex items-center p-4 g-4">
            <label htmlFor="valor1" className={`p-4 min-w-[126px] max-w-1/5 h-[136px] relative ${graficoPeso === 1 ? "border-4" : "border-none"}`}>
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
            <label htmlFor="valor2" className={`p-4 min-w-[126px] max-w-1/5 h-[136px] relative ${graficoPeso === 2 ? "border-4" : "border-none"}`}>
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
            <label htmlFor="valor3" className={`p-4 min-w-[126px] max-w-1/5 h-[136px] relative ${graficoPeso === 3 ? "border-4" : "border-none"}`}>
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
            <label htmlFor="valor4" className={`p-4 min-w-[126px] max-w-1/5 h-[136px] relative ${graficoPeso === 4 ? "border-4" : "border-none"}`}>
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
            <label htmlFor="valor5" className={`p-4 min-w-[126px] max-w-1/5 h-[136px] relative ${graficoPeso === 5 ? "border-4" : "border-none"}`}>
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
