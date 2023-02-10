import { useState, useEffect, useCallback, TouchEvent } from 'react'
import { data } from './testimonios_data'
import { motion } from 'framer-motion'

const CAROUSEL_AUTO_SCROLL_DELAY = 5000
const TOUCH_SCREEN_SLIDE_TOLERANCE = 35

interface BallCursorProps {
  index: number
  length: number
  setIndex: (i: number) => void
}

const BallCursor = ({ index, length, setIndex }: BallCursorProps) => {
  const arr = new Array(length).fill('')
  return (
    <div className="flex h-12 w-full items-center justify-evenly gap-2 px-16 transition-all">
      {arr.map((_, i) =>
        i === index ? (
          <div
            key={i}
            className="border-secondary/75 bg-secondary/75 h-4 w-4 rounded-full border-2"
          ></div>
        ) : (
          <div
            key={i}
            className="border-secondary/75 h-3 w-3 cursor-pointer rounded-full border-2"
            onClick={() => setIndex(i)}
          ></div>
        )
      )}
    </div>
  )
}

export default function Testimonios() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [isBackwards, setIsBackwards] = useState<boolean>(false)

  const forward = useCallback(() => {
    if (isBackwards) setIsBackwards(false)
    if (currentIndex === data.length - 1) {
      setCurrentIndex(0)
    } else setCurrentIndex(curr => curr + 1)
  }, [currentIndex, isBackwards])

  const backward = () => {
    setIsBackwards(true)
    if (currentIndex === 0) {
      setCurrentIndex(data.length - 1)
    } else setCurrentIndex(curr => curr - 1)
  }

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].screenX)
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart !== null) {
      const dif = touchStart - e.changedTouches[0].screenX
      if (dif < 0 && dif < TOUCH_SCREEN_SLIDE_TOLERANCE * -1) {
        backward()
      } else if (dif > TOUCH_SCREEN_SLIDE_TOLERANCE) forward()
      setTouchStart(null)
    }
  }

  useEffect(() => {
    const i = setInterval(() => {
      if (!isBlocked) forward()
    }, CAROUSEL_AUTO_SCROLL_DELAY)

    return () => clearInterval(i)
  }, [forward, isBlocked])

  return (
    <div
      className="relative m-auto mt-2 h-screen w-full overflow-x-hidden sm:h-96 sm:w-4/5"
      onMouseEnter={() => setIsBlocked(true)}
      onMouseLeave={() => setIsBlocked(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="absolute left-0 top-0 hidden h-full w-8 cursor-pointer select-none items-center justify-center text-xl  transition-all sm:flex"
        onClick={backward}
      >
        <div className="flex h-32 w-full items-center justify-center rounded-md bg-black/10 p-2 backdrop-blur-lg hover:bg-black/20">
          {'<'}
        </div>
      </div>
      <div className="text-primary flex h-full w-full flex-col px-2 sm:px-10">
        <motion.div
          className="flex h-full grow flex-col justify-center gap-2 sm:px-2"
          key={currentIndex}
          initial={{ x: isBackwards ? '-100%' : '100%', opacity: '20%' }}
          animate={{ x: 0, opacity: '100%' }}
          transition={{ duration: 0.25 }}
        >
          <h6 className="font-semibold">{data[currentIndex].paciente} 🐾</h6>
          <p className="ml-2 italic">&quot;{data[currentIndex].texto}&quot;</p>
          <h6 className="mt-2 text-right font-semibold">
            {data[currentIndex].tutor}
          </h6>
        </motion.div>
        <BallCursor
          index={currentIndex}
          length={data.length}
          setIndex={setCurrentIndex}
        />
      </div>
      <div
        className="bg-black/1 absolute right-0 top-0 hidden h-full w-8 cursor-pointer select-none items-center justify-center text-xl transition-all sm:flex"
        onClick={forward}
      >
        <div className="flex h-32 w-full items-center justify-center rounded-md bg-black/10 p-2 backdrop-blur-lg hover:bg-black/20">
          {'>'}
        </div>
      </div>
    </div>
  )
}
