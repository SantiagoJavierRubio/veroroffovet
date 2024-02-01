import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

import Image from 'next/image'

interface PhotoProps extends HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
}

const Photo: FC<PhotoProps> = ({ src, alt, className, ...props }) => {
  const twStyle = twMerge(
    'relative rounded-full aspect-square overflow-hidden',
    className
  )
  return (
    <div className={twStyle} {...props}>
      <Image
        src={src}
        alt={alt}
        fill
        blurDataURL={src}
        className="object-cover"
      />
    </div>
  )
}

export default Photo
