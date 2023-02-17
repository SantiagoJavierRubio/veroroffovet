import { PropsWithChildren, FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Container: FC<PropsWithChildren & HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  const twStyles = twMerge('mx-auto w-full max-w-5xl py-8', className)
  return (
    <div className={twStyles} {...props}>
      {children}
    </div>
  )
}

export default Container
