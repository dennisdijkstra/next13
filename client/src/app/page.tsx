'use client'

import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import Button from '@/components/Button'
import { logout as logOutFetcher } from '@/api'
import { useAuthStore } from '@/store/authStore'
import { useShallow } from 'zustand/react/shallow'

const Page = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore(
    useShallow((state) => ({ isAuthenticated: state.isAuthenticated, setIsAuthenticated: state.setIsAuthenticated }))
  )
  const router = useRouter()
  const { trigger: logout } = useSWRMutation('auth/logout', logOutFetcher)

  const handleClick = async () => {
    await logout()
    setIsAuthenticated(false)
    router.push('/login')
  }

  console.log(isAuthenticated)

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
