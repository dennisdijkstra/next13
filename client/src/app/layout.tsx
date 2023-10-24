'use client'

import { ReactNode, useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { getUser as fetcher } from '@/api'
import './globals.css'

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({
  children,
}: RootLayoutProps) => {
  const { data } = useSWR('users/31', fetcher)
  const router = useRouter()

  useEffect(() => {
    if (data?.res?.ok) {
      router.push('/')
    }
  }, [data?.res?.ok, router])

  return (
    <html lang='en'>
      <body className='flex min-w-full min-h-screen p-10 bg-purple-50'>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
