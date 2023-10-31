'use client'

import { ReactNode, useEffect } from 'react'
import useSWR from 'swr'
import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '@/store/authStore'
import { getUser as fetcher } from '@/api'
import Header from '@/components/Header'
import Main from '@/components/Main'
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

  const { user, setUser } = useAuthStore(
    useShallow((state) => ({ user: state.user, setUser: state.setUser }))
  )

  useEffect(() => {
    if (data && ! user) {
      setUser(data.res)
    }
  }, [data, user, setUser])

  return (
    <html lang='en' className={openSans.className}>
      <body className='flex min-w-full min-h-screen bg-purple-50'>
        <SideNav />
        <div className="flex flex-col flex-1 bg-purple-50">
          <Header />
          <Main>
            {children}
          </Main>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
