import { useState, FC } from 'react'
import Image from 'next/image'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

const ImageDisplayer: FC<{
  imageList: string[]
}> = ({ imageList }) => {
  const [index, setIndex] = useState<number>(0)

  const goNext = () => {
    if (index < imageList.length - 1) {
      setIndex(prev => prev + 1)
    }
  }
  const goPrev = () => {
    if (index > 0) {
      setIndex(prev => prev - 1)
    }
  }

  const renderItemSize = (i: number) => {
    if (i === index) return 'inset-x-0 opacity-100'
    else if (i > index) return 'left-full right-0 opacity-0'
    else return 'left-0 right-full opacity-0'
  }

  return (
    <div className="relative aspect-[2/3] overflow-hidden">
      {imageList.map((image, i) => (
        <div
          key={`carousel-item-${i + 1}`}
          className={`absolute inset-y-0 transition-all ease-in-out ${renderItemSize(
            i
          )}`}
        >
          <Image src={image} fill alt="carousel image" />
        </div>
      ))}
      <div
        className={`absolute inset-y-0 left-0 flex select-none items-center justify-center pr-2 transition-all hover:bg-gradient-to-r hover:from-stone-900/10 ${
          index === 0
            ? 'cursor-default opacity-0'
            : 'cursor-pointer opacity-100'
        }`}
        onClick={goPrev}
      >
        <FaChevronLeft size={26} />
      </div>
      <div
        className={`absolute inset-y-0 right-0 flex select-none items-center justify-center pl-2 transition-all hover:bg-gradient-to-l hover:from-stone-900/10 ${
          index === imageList.length - 1
            ? 'cursor-default opacity-0'
            : 'cursor-pointer opacity-100'
        }`}
        onClick={goNext}
      >
        <FaChevronRight size={26} />
      </div>
    </div>
  )
}

export default ImageDisplayer
