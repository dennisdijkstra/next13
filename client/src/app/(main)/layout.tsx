'use client'

import { ReactNode, useEffect } from 'react'
import useSWR from 'swr'
import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '@/store/authStore'
import { useNotificationsStore } from '@/store/notificationsStore'
import { getUser as fetcher } from '@/api'
import Header from '@/components/Header'
import Main from '@/components/Main'
import NotificationsList from '@/components/NotificationsList'
import SideNav from '@/components/SideNav'
import { openSans } from '../fonts'
import '../globals.css'

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({
  children,
}: RootLayoutProps) => {
  const { data } = useSWR('users/me', fetcher)

  const addNotification = useNotificationsStore((state) => state.addNotification)
  const { user, setUser } = useAuthStore(
    useShallow((state) => ({ user: state.user, setUser: state.setUser }))
  )

  useEffect(() => {
    if (data && ! user) {
      setUser(data.res)
    }
  }, [data, user, setUser])

  const onClick = () => {
    const status = ['success', 'warning', 'failure']
    addNotification({ type: status[Math.floor(Math.random() * status.length)], message: 'This is a warning notification!' })
  }

  return (
    <html lang='en' className={openSans.className}>
      <body className='flex min-w-full min-h-screen bg-purple-50'>
        <SideNav />
        <div className="flex flex-col flex-1 bg-purple-50">
          <Header />
          <Main>
            {children}
            <button onClick={onClick}>Trigger notification</button>
          </Main>
          <NotificationsList />
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  )
}

export default RootLayout
