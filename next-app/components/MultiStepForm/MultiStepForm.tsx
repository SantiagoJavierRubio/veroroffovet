import { FormEvent, ReactNode, createContext, useState, Context } from 'react'
import { useMultistepForm } from '@/hooks/useMultistepForm'

interface MultiStepFormProps {
    pages: ReactNode[]
    submitFunction: Function
}

export default function MultiStepForm(props: MultiStepFormProps) {
    const { pages, submitFunction } = props
    const { steps, step, forward, back, currentStepIndex, isFirstStep, isLastStep } = useMultistepForm(pages)
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(isLastStep()) return submitFunction()
        forward()
    }

  return (
    <form onSubmit={handleSubmit} className="relative">
        <div className='absolute top-2 right-2'>
            {currentStepIndex+1}/{steps.length}
        </div>
        {step}
        {!isFirstStep() && <button type="button" onClick={back}>Atras</button>}
        {isLastStep() ? 
            <button type="submit">Finalizar</button> 
            : 
            <button type="submit">Seguir</button>
        }
    </form>
  )
}
