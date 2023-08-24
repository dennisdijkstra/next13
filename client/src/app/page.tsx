'use client'

import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import Button from '@/components/Button'
import { logout } from '@/api'

const Page = () => {
  const router = useRouter()
  const { trigger } = useSWRMutation('auth/logout', logout)

  const handleClick = async () => {
    await trigger()
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
