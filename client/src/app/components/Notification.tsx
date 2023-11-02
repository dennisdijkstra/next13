'use client'

import { ForwardRefExoticComponent } from 'react'
import { WarningCircle, CheckCircle, XCircle, X, IconProps } from '@phosphor-icons/react'
import { classNames } from '@/utils/index'

type NoticationTypes = 'success' | 'failure' | 'warning'

type NotificationProps = {
  message: string
  type: NoticationTypes
  onClose: () => void
}

type Icons = {
  success: ForwardRefExoticComponent<IconProps>
  failure: ForwardRefExoticComponent<IconProps>
  warning: ForwardRefExoticComponent<IconProps>
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
  const icons: Icons = {
    success: CheckCircle,
    failure: XCircle,
    warning: WarningCircle,
  }

  const classes = {
    success: 'bg-green-100',
    failure: 'bg-red-100',
    warning: 'bg-yellow-100',
  }

  const Icon = icons[type]
  const className = classes[type]

  return (
    <div
      className={classNames(
        'h-20 w-96 px-12',
        'absolute right-8 bottom-8',
        'rounded-md text-sm',
        'flex justify-center items-center',
        className
      )}>
      <Icon size={24} weight="bold" className="absolute top-1/2 -translate-y-1/2 left-4" />
      <p>{message}</p>
      <button onClick={onClose} className="absolute top-1/2 -translate-y-1/2 right-4">
        <X size={16} weight="bold" />
      </button>
    </div>
  )
}

export default Notification
