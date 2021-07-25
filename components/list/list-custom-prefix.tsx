import { ReactElement } from 'react'

type ListCustomPrefixProps={
  prefixIcon:ReactElement, label:string, content:string[], className?:string
}
export const ListCustomPrefix = (
  {
    prefixIcon, label, content: contents, className,
  }:ListCustomPrefixProps,
):ReactElement => (
  <div className={className}>
    <p className="lg:text-2xl text-xl leading-loose text-gray-700 mt-2">{label}</p>
    <ul className=".list-inside">
      {contents.map((content) => (
        <li className="text-xl lg:leading-loose text-gray-500" key={content}>
          {prefixIcon}
          {content}
        </li>
      ))}
    </ul>
  </div>
)

export default ListCustomPrefixProps

ListCustomPrefix.defaultProps = {
  className: '',
}
