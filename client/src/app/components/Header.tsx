'use client'

import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import { logout as fetcher } from '@/api'
import { useAuthStore } from '@/store/authStore'

const Header = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
  const router = useRouter()
  const { trigger: logout } = useSWRMutation('auth/logout', fetcher)

  const handleClick = async () => {
    await logout()
    setIsAuthenticated(false)

    router.push('/login')
  }
  return (
    <div className="h-16 p-5 flex items-center bg-white">
      <button onClick={handleClick} className="ml-auto underline">Sign out</button>
    </div>
  )
}

export default Header
