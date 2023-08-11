import { ReactNode } from "react"
import "./globals.css"

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <body className='flex min-w-full min-h-screen p-10'>{children}</body>
    </html>
  )
}

export default RootLayout
