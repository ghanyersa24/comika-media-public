import { ReactElement, ReactNode } from 'react'

type ContainerStoreType ={
children : ReactNode,
title:string,
titleDescription:string,
className:string
}

export const ContainerStore = ({
  children, title, titleDescription, className,
}
  :ContainerStoreType):ReactElement => (
    <div className={className}>
      <h2 className="title">{title}</h2>
      <p className="title-description">{titleDescription}</p>
      {children}
    </div>
)

export default ContainerStore
