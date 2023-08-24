'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import * as yup from 'yup'
import { login } from '@/api'
import { capitalize } from '@/utils'
import Input from '@/components/Input'
import Button from '@/components/Button'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const Page = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const router = useRouter()
  const { trigger, isMutating: isLoading } = useSWRMutation('auth/login', login)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')

    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await schema.validate(data, { abortEarly: false })
    } catch (error) {
      setError(error.errors[0])
    }

    try {
      await trigger({
        email: data.email,
        password: data.password
      })
        
    } catch (error) {
      return
    }

    router.push('/')
  }

  return (
    <div className='w-full flex flex-col'>
      <h1 className='text-4xl font-bold'>Log In</h1>
      <div className='flex flex-1 items-center justify-center'>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col mb-6'>
            <Input
              name='email'
              label='Email'
              value={data.email}
              onChange={onChange}
              className='w-80'
            />
            <Input
              type='password'
              name='password'
              label='Password'
              value={data.password}
              onChange={onChange}
              className='w-80'
            />
          </div>
          {error && <p className="text-sm text-red-600 absolute bottom-[84px]">{capitalize(error)}</p>}
          <Button type='submit' className='w-full' isDisabled={isLoading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Page
