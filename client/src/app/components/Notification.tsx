'use client'

import { ForwardRefExoticComponent } from 'react'
import { useNotificationsStore } from '@/store/notificationsStore'
import { WarningCircle, CheckCircle, XCircle, X, IconProps } from '@phosphor-icons/react'
import { classNames } from '@/utils/index'

type Notification = {
  id: string,
  message: string,
  type: 'success' | 'failure' | 'warning'
}

type NotificationProps = {
  notification: Notification
  onClose: () => void
}

type Icons = {
  success: ForwardRefExoticComponent<IconProps>
  failure: ForwardRefExoticComponent<IconProps>
  warning: ForwardRefExoticComponent<IconProps>
}

const Notification = ({ notification, onClose }: NotificationProps) => {
  const { id, type, message } = notification
  const removeNotification = useNotificationsStore((state) => state.removeNotification)

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

  const close = () => {
    removeNotification(id)
  }

  return (
    <div
      className={classNames(
        'relative mb-2 last:mb-0',
        'h-16 w-[400px] px-12',
        'rounded-md text-sm',
        'flex justify-center items-center',
        className
      )}>
      <Icon size={24} weight="bold" className="absolute top-1/2 -translate-y-1/2 left-4" />
      <p>{message}</p>
      <button onClick={close} className="absolute top-1/2 -translate-y-1/2 right-4">
        <X size={16} weight="bold" />
      </button>
    </div>
  )
}

export default Notification
