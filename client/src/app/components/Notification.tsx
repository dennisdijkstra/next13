'use client'

import { useEffect, useState, useCallback, ForwardRefExoticComponent } from 'react'
import { CSSTransition } from 'react-transition-group'
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
  const [shouldShow, setShouldShow] = useState(false)
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
    setShouldShow(false)
    setTimeout(() => removeNotification(id), 300)
  }, [removeNotification])

  useEffect(() => {
    setShouldShow(true)
  }, [])

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
    <CSSTransition
      in={shouldShow}
      timeout={300}
      classNames={{
        enter: 'translate-x-full',
        enterActive: 'translate-x-px transition duration-300',
        enterDone: 'translate-x-px',
        exitActive: 'translate-x-full transition duration-300',
        exitDone: 'translate-x-full',
      }}
    >
      <div
        className={classNames(
          'relative mb-2 last:mb-0',
          'h-16 w-[400px] px-12',
          'rounded-md text-sm',
          'flex justify-center items-center',
          'translate-x-full',
          className
        )}>
        <Icon size={24} weight="bold" className="absolute top-1/2 -translate-y-1/2 left-4" />
        <p>{message}</p>
        <button onClick={() => close(id)} className="absolute top-1/2 -translate-y-1/2 right-4">
          <X size={16} weight="bold" />
        </button>
      </div>
    </CSSTransition>
  )
}

export default Notification
