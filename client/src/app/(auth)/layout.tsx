'use client'

import { ReactNode } from 'react'
import { Open_Sans } from 'next/font/google'
import '../globals.css'

type RootLayoutProps = {
  children: ReactNode
}

const openSans = Open_Sans({ subsets: ['latin'], weight: '600' })

const RootLayout = ({
  children,
}: RootLayoutProps) => {
  return (
    <html lang='en' className={openSans.className}>
      <body className='flex min-w-full min-h-screen bg-purple-50 p-10'>
        <div className="w-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout
