import { FunctionComponent, ReactElement, ReactNode } from 'react'

type ContainerStoreType ={
children : ReactNode,
title:string,
titleDescription?:string,
className:string
}

export const ContainerStore :FunctionComponent<ContainerStoreType> = ({
  children, title, titleDescription = null, className,
}):ReactElement => (
  <div className={className}>
    <h2 className="title">{title}</h2>
    {titleDescription ? <p className="title-description">{titleDescription}</p> : <div className="my-3" />}
    {children}
  </div>
)

export default ContainerStore
