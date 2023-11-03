import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

type Notification = {
  message: string,
  type: 'success' | 'failure' | 'warning'
}

type NotificationWithId =  Notification & {
  id: string,
}

type NotificationsState = {
  notifications: NotificationWithId[]
  addNotification: (notification: Notification) => void
  removeNotification: (id: string) => void
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  addNotification: (notification: Notification) => {
    const { notifications } = get()
    set({ notifications: [...notifications, { ...notification, id: uuid() }]})
  },
  removeNotification: (id: string) => {
    const { notifications } = get()
    set({ notifications: notifications.filter((notification) => notification.id !== id)})
  },
}))
