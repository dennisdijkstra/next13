'use client'

import { useEffect, useCallback, ForwardRefExoticComponent } from 'react'
import { useNotificationsStore } from '@/store/notificationsStore'
import { WarningCircle, CheckCircle, XCircle, X, IconProps } from '@phosphor-icons/react'
import { classNames } from '@/utils/index'

type Notification = {
  id: string,
  message: string,
  type: 'success' | 'failure' | 'warning'
  hasAutoClose?: boolean,
}

type NotificationProps = {
  notification: Notification
}

type Icons = {
  success: ForwardRefExoticComponent<IconProps>
  failure: ForwardRefExoticComponent<IconProps>
  warning: ForwardRefExoticComponent<IconProps>
}

const Notification = ({ notification }: NotificationProps) => {
  const { id, type, message, hasAutoClose = true } = notification
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

  const close = useCallback((id: string) => {
    removeNotification(id)
  }, [removeNotification])

  useEffect(() => {
    if (! hasAutoClose) {
      return
    }

    const timeoutId = setTimeout(() => {
      close(id)
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [id, close, hasAutoClose])

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
      <button onClick={() => close(id)} className="absolute top-1/2 -translate-y-1/2 right-4">
        <X size={16} weight="bold" />
      </button>
    </div>
  )
}

export default Notification
