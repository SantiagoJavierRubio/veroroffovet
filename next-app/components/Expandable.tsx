import { useState, PropsWithChildren } from 'react'

interface ExpandableProps {
  title: string
  startOpen?: boolean
}

export default function Expandable(props: PropsWithChildren<ExpandableProps>) {
  const { startOpen, title, children } = props
  const [open, setOpen] = useState(startOpen || false)
  const toggleOpen = () => setOpen(prev => !prev)
  return (
    <div className="transition-all">
      <button
        className="bg-primary relative w-full py-2 text-2xl font-bold lg:rounded-md"
        onClick={toggleOpen}
      >
        {title}
        <span
          className={`text-secondary/50 absolute right-4 text-xl font-light ${
            open ? '-rotate-90' : 'rotate-90'
          }`}
        >
          {'>'}
        </span>
      </button>
      <div className="flex flex-col justify-center align-top">
        {open && children}
      </div>
    </div>
  )
}
