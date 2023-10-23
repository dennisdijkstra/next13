'use client'

import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import Button from '@/components/Button'
import { logout as logOutFetcher, getUser as getUserFetcher } from '@/api'

const Page = () => {
  const router = useRouter()
  const { trigger: logout } = useSWRMutation('auth/logout', logOutFetcher)
  const { trigger: getUser } = useSWRMutation('users/31', getUserFetcher)

  const handleClick = async () => {
    await logout()
    router.push('/login')
  }

  const users = async () => {
    await getUser()
  }

  return (
    <div className='w-full flex flex-col'>
      <h1 className='text-4xl font-bold'>Home</h1>
      <Button onClick={users} className="mt-auto self-start">
        Make user request
      </Button>
      <Button onClick={handleClick} className="mt-auto self-start">
        Log Out
      </Button>
    </div>
  )
}

export default Page
