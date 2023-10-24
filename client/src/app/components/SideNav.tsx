'use client'

import { useState } from 'react'
import Link from 'next/link'
import { classNames } from '@/utils/index'

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  return (
    <div className={classNames(
      'relative flex flex-col flex-end bg-black text-white',
      isOpen ? 'w-40' : 'w-16',
      'transition-width duration-300',
    )}>
      <div className="h-16 flex items-center justify-center">
        <Link href="/">
          <div className="h-11 w-11 bg-gradient-radial from-orange-300 to-violet-800 rounded-full" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Link href="/settings" className="">X</Link>
      </div>
      <button
        onClick={handleClick}
        className="absolute top-1/2 -translate-y-1/2 h-6 w-6 bg-black rounded-full top-0 -right-2.5"
      >
        {isOpen ? '<' : '>'}
      </button>
    </div>
  )
}

export default SideNav
