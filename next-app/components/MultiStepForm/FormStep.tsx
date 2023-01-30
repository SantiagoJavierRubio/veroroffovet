import React, { PropsWithChildren } from 'react'

interface FormStepProps {
    title: string;
}

export default function FormStep(props: PropsWithChildren<FormStepProps>) {
    const { title, children } = props
  return (
    <>
        <h3>{title}</h3>
        <div className='flex flex-col'>
          {children}
        </div>
    </>
  )
}
