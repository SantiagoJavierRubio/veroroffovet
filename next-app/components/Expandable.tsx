import { useState, PropsWithChildren } from 'react'

interface ExpandableProps {
    title: string
    startOpen?: boolean
}

export default function Expandable(props: PropsWithChildren<ExpandableProps>) {
    const [open, setOpen] = useState(props.startOpen || false)
    const toggleOpen = () => setOpen(prev => !prev)
  return (
    <div className='transition-all'>
        <button 
            className='w-full py-2 bg-secondary rounded-sm'
            onClick={toggleOpen}
        >
            {props.title}
        </button>
        <div className='flex flex-col align-top justify-center'>
            {open && props.children}
        </div>
    </div>
  )
}
