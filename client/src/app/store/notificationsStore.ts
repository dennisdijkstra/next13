import { create } from 'zustand'

type Notification = {
  id: string,
  message: string,
  type: 'success' | 'failure' | 'warning'
}

type NotificationsState = {
  notifications: Notification[]
  addNotification: (notification: Notification) => void
  removeNotification: (id: string) => void
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  addNotification: (notification: Notification) => {
    const { notifications } = get()
    set({ notifications: [...notifications, notification]})
  },
  removeNotification: (id: string) => {
    const { notifications } = get()
    set({ notifications: notifications.filter((notification) => notification.id !== id)})
  },
}))
