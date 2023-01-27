import React, { PropsWithChildren } from 'react'

interface FormStepProps {
    title: string;
}

export default function FormStep(props: PropsWithChildren<FormStepProps>) {
    const { title, children } = props
  return (
    <div>
        <h3>{title}</h3>
        {children}
    </div>
  )
}
