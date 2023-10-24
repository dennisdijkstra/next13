'use client'

import { ReactNode, useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
// import { useAuthStore } from '@/store/authStore'
import { getUser as fetcher } from '@/api'
import Header from '@/components/Header'
import Main from '@/components/Main'
import SideNav from '@/components/SideNav'
import '../globals.css'

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({
  children,
}: RootLayoutProps) => {
  const { data } = useSWR('users/31', fetcher)
  const router = useRouter()
  //   const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    if (data?.res?.ok) {
      router.push('/')
    }
  }, [data?.res?.ok, router])

  return (
    <html lang='en'>
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
