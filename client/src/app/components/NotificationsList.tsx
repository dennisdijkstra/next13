'use client'

import Notification from '@/components/Notification'

type Notification = {
  id: string,
  message: string,
  type: 'success' | 'failure' | 'warning'
}

type NotificationsListProps = {
  notifications: Notification[],
}

const NotificationsList = ({ notifications }: NotificationsListProps) => {
  const onClose = () => {
    console.log('Close')
  }

  return (
    <div className="absolute right-2 bottom-2">
      {notifications.map(({ message, type }) => (
        <Notification
          key={message}
          message={message}
          type={type}
          onClose={onClose}
        />
      ))}
    </div>
  )
}

export default NotificationsList
