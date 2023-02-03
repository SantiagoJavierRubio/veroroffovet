import { FormEvent, ReactNode } from 'react'
import { useMultistepForm } from '@/hooks/useMultistepForm'

interface MultiStepFormProps {
  pages: ReactNode[]
  submitFunction: () => void
}

export default function MultiStepForm(props: MultiStepFormProps) {
  const { pages, submitFunction } = props
  const {
    steps,
    step,
    forward,
    back,
    currentStepIndex,
    isFirstStep,
    isLastStep
  } = useMultistepForm(pages)

  // TODO Add some kind of custom validation
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isLastStep()) return submitFunction()
    forward()
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
            className="rounded-lg border-2 py-2 px-4 font-bold text-stone-50"
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
            className="rounded-lg border-2 py-2 px-4 font-bold text-stone-50"
            id="finalSubmitBtn"
          >
            Finalizar
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-lg border-2 py-2 px-4 font-bold text-stone-50"
            id="continueBtn"
          >
            Seguir
          </button>
        )}
      </div>
    </form>
  )
}
