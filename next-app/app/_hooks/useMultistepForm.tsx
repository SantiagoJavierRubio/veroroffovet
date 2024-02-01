'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

export function useMultistepForm(steps: ReactNode[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)

  const isLastStep = (): boolean => {
    return currentStepIndex === steps.length - 1
  }
  const isFirstStep = (): boolean => {
    return currentStepIndex === 0
  }
  const forward = () => {
    if (!isLastStep()) setCurrentStepIndex(curr => curr + 1)
  }
  const back = () => {
    if (!isFirstStep()) setCurrentStepIndex(curr => curr - 1)
  }
  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) setCurrentStepIndex(index)
  }

  return {
    steps,
    currentStepIndex,
    step: steps[currentStepIndex],
    isLastStep,
    isFirstStep,
    goToStep,
    forward,
    back
  }
}
