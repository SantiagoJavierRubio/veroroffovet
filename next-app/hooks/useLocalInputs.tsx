'use client'

import { useState, useEffect } from 'react'

export default function useLocalInputs<T>(initialData: T) {
  const [inputs, setInputs] = useState<typeof initialData>(initialData)
  useEffect(() => {
    setInputs(initialData)
  }, [initialData])
  const updateInputs = (key: keyof T, value: T[typeof key]) => {
    setInputs(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return {
    inputs,
    updateInputs
  }
}
