import { ReactNode } from 'react'
import './globals.css'

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({
  children,
}: RootLayoutProps) => {
  return (
    <html lang='en'>
      <body className='flex min-w-full min-h-screen p-10 bg-purple-50'>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
