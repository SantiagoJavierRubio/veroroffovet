import { useState, PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

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
        className="bg-primary group relative w-full py-2 text-2xl font-bold text-stone-100 lg:rounded-md"
        onClick={toggleOpen}
      >
        {title}
        <span
          className={`text-secondary absolute right-4 scale-y-150 text-2xl font-semibold transition-all group-hover:right-5 ${
            open ? '-rotate-90' : 'rotate-90'
          }`}
        >
          {'>'}
        </span>
      </button>
      <motion.article
        className="flex origin-top flex-col justify-center align-top"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 100, display: open ? 'flex' : 'none' }}
        exit={{ scaleY: 0, opacity: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.15 }}
        key={`${open}`}
      >
        {children}
      </motion.article>
    </div>
  )
}
