import { PropsWithChildren } from 'react'

export default function Container(props: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-5xl py-8">{props.children}</div>
}
