'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import * as yup from 'yup'
import Link from 'next/link'
import { login } from '@/api'
import { capitalize } from '@/utils'
import Input from '@/components/Input'
import Button from '@/components/Button'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const Page = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const router = useRouter()
  const { trigger, isMutating: isLoading } = useSWRMutation('auth/login', login)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')

    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await schema.validate(formData, { abortEarly: false })
    } catch (error) {
      setError(error.errors[0])
      return
    }

    try {
      await trigger({
        email: formData.email,
        password: formData.password
      })
    } catch (error) {
      setError(error.message)
      return
    }

    router.push('/')
  }

  return (
    <div className='w-full flex flex-col'>
      <h1 className='text-4xl font-bold'>Log In</h1>
      <div className='flex flex-1 items-center justify-center'>
        <form onSubmit={onSubmit} className="relative">
          <div className='flex flex-col mb-8'>
            <Input
              name='email'
              label='Email'
              value={formData.email}
              onChange={onChange}
              className='w-96'
            />
            <Input
              type='password'
              name='password'
              label='Password'
              value={formData.password}
              onChange={onChange}
              className='w-96'
            />
          </div>
          {error && <p className="text-sm text-red-600 absolute bottom-[84px]">{capitalize(error)}</p>}
          <Button type='submit' className='w-full mb-4' isDisabled={isLoading}>
            Login
          </Button>
          <Link href="/signup" className="float-right underline">Sign up</Link>
        </form>
      </div>
    </div>
  )
}

export default Page
