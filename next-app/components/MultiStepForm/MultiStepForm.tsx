import { FormEvent, ReactNode } from 'react'
import { useMultistepForm } from '@/hooks/useMultistepForm'

interface MultiStepFormProps {
  pages: ReactNode[]
  submitFunction: () => void
  stepValidation: (index: number) => boolean
}

export default function MultiStepForm(props: MultiStepFormProps) {
  const { pages, submitFunction, stepValidation } = props
  const {
    steps,
    step,
    forward,
    back,
    currentStepIndex,
    isFirstStep,
    isLastStep
  } = useMultistepForm(pages)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isLastStep()) return submitFunction()
    if (stepValidation(currentStepIndex)) forward()
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="absolute -top-4 right-2 sm:top-2">
        {currentStepIndex + 1}/{steps.length}
      </div>
      {step}
      <div className="m-auto mt-4 flex max-w-4xl justify-between px-8">
        {!isFirstStep() ? (
          <button
            className="rounded-lg bg-gray-500 py-2 px-4 font-bold text-stone-50 shadow-none outline-none transition-all duration-75 hover:-translate-y-px hover:shadow-black/60 hover:drop-shadow-xl hover:duration-75 active:translate-y-0 active:scale-100 active:bg-gray-500/90 active:shadow-inner"
            type="button"
            id="backBtn"
            onClick={back}
          >
            Atras
          </button>
        ) : (
          <div></div>
        )}
        {isLastStep() ? (
          <button
            type="submit"
            className=" rounded-lg  bg-green-600 py-2 px-4 font-bold text-stone-50 shadow-none outline-none transition-all duration-75 hover:-translate-y-px hover:shadow-black/60 hover:drop-shadow-xl hover:duration-75 active:translate-y-0 active:scale-100 active:bg-green-600/90 active:shadow-inner"
            id="finalSubmitBtn"
          >
            Finalizar
          </button>
        ) : (
          <button
            type="submit"
            className="bg-primary active:bg-primary/90 rounded-lg py-2 px-4 font-bold text-stone-50 shadow-none outline-none transition-all duration-75 hover:-translate-y-px hover:shadow-black/60 hover:drop-shadow-xl hover:duration-75 active:translate-y-0 active:scale-100 active:shadow-inner disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none disabled:drop-shadow-none"
            id="continueBtn"
          >
            Seguir
          </button>
        )}
      </div>
    </form>
  )
}
