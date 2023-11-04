'use client'

import Notification from '@/components/Notification'
import { useNotificationsStore } from '@/store/notificationsStore'

const NotificationsList = () => {
  const notifications = useNotificationsStore((state) => state.notifications)

  return (
    <div className="absolute right-2 bottom-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  )
}

export default NotificationsList
