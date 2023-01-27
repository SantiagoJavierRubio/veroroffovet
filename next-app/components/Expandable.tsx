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
    <div className='transition-all'>
        <button 
            className='w-full py-2 bg-primary rounded-sm font-bold text-xl'
            onClick={toggleOpen}
        >
            {title}
        </button>
        <div className='flex flex-col align-top justify-center'>
            {open && children}
        </div>
    </div>
  )
}
