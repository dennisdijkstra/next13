'use client'

import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import Button from '@/components/Button'
import { logout as fetcher } from '@/api'

const Page = () => {
  const router = useRouter()
  const { trigger: logout } = useSWRMutation('auth/logout', fetcher)

  const handleClick = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <div>
      <h1 className='text-4xl font-bold'>Home</h1>
      <Button onClick={handleClick}>
        Log Out
      </Button>
    </div>
  )
}

export default Page
