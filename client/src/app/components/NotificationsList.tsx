'use client'

import Notification from '@/components/Notification'
import { useNotificationsStore } from '@/store/notificationsStore'

type Notification = {
  message: string,
  type: 'success' | 'failure' | 'warning'
}

const NotificationsList = () => {
  const notifications = useNotificationsStore((state) => state.notifications)

  const onClose = () => {
    console.log('Close')
  }

  return (
    <div className="absolute right-2 bottom-2">
      {notifications.map(({ id, message, type }) => (
        <Notification
          key={id}
          type={type}
          message={message}
          onClose={onClose}
        />
      ))}
    </div>
  )
}

export default NotificationsList
