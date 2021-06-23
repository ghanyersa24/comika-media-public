import { ReactNode } from 'react'

type ContainerPadding={
  className?:string,
  children:ReactNode
}
export default function Container({ children, className }:ContainerPadding):any {
  return <div className={`container mx-auto px-8 max-w-screen-xl ${className}`}>{children}</div>
}

Container.defaultProps = {
  className: '',
}
