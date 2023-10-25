'use client'

import Link from 'next/link'

type SideNavLinkProps = {
  title: string
  url: string
  isActive: boolean
}

const SideNavLink = ({ title, url, isActive }: SideNavLinkProps) => {
  return (
    <div className="flex justify-center mb-2">
      <Link href={url} className="text-[10px]">
        <div className="h-11 w-11 bg-white rounded-full mb-1" />
        <p className="text-center">{title}</p>
      </Link>
    </div>
  )
}

export default SideNavLink
