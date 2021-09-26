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
    <p className="mt-2 text-lg leading-loose text-primary lg:text-2xl">{label}</p>
    <ul className=".list-inside list-none">
      {contents.map((content) => (
        <li className="text-base text-gray-500 md:text-lg lg:leading-loose" key={content}>
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
