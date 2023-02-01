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
        className="w-full rounded-sm bg-primary py-2 text-xl font-bold"
        onClick={toggleOpen}
      >
        {title}
      </button>
      <div className="flex flex-col justify-center align-top">
        {open && children}
      </div>
    </div>
  )
}
