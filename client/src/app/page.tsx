'use client'

import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import Button from '@/components/Button'
import { logout as fetcher } from '@/api'
import { useAuthStore } from '@/store/authStore'

const Page = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
  const router = useRouter()
  const { trigger: logout } = useSWRMutation('auth/logout', fetcher)

  const handleClick = async () => {
    await logout()
    setIsAuthenticated(false)

    router.push('/login')
  }

  return (
    <div className='w-full flex flex-col'>
      <h1 className='text-4xl font-bold'>Home</h1>
      <Button onClick={handleClick} className="mt-auto self-start">
        Log Out
      </Button>
    </div>
  )
}

export default Page
