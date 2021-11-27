import { FunctionComponent } from 'react'

const NotificationHint: FunctionComponent = () => (
  <span className="absolute top-0 flex items-center justify-center w-3 h-3 -right-4 ">
    <span className="absolute inline-flex w-2.5 h-2.5 bg-red-300 rounded-full opacity-75 animate-ping" />
    <span className="relative inline-flex w-2 h-2 bg-red-500 rounded-full" />
  </span>
)

export default NotificationHint
