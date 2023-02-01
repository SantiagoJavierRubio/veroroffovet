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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isLastStep()) return submitFunction()
    forward()
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="absolute top-2 right-2">
        {currentStepIndex + 1}/{steps.length}
      </div>
      {step}
      <div className="m-auto mt-4 flex max-w-4xl justify-between px-8">
        {!isFirstStep() ? (
          <button type="button" id="backBtn" onClick={back}>
            Atras
          </button>
        ) : (
          <div></div>
        )}
        {isLastStep() ? (
          <button type="submit" id="finalSubmitBtn">
            Finalizar
          </button>
        ) : (
          <button type="submit" id="continueBtn">
            Seguir
          </button>
        )}
      </div>
    </form>
  )
}
