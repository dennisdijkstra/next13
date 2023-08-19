'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import useSWRMutation from 'swr/mutation'
import { createUser } from '@/api'
import Input from '@/components/Input'
import Button from '@/components/Button'

const Page = () => {
  const { trigger: createNewUser, isMutating: isCreating } = useSWRMutation('users', createUser)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'email') {
      setEmail(e.currentTarget.value)
      return
    }

    if (e.currentTarget.name === 'password') {
      setPassword(e.currentTarget.value)
      return
    }

    setConfirmPassword(e.currentTarget.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createNewUser({ email, password})
  }

  return (
    <div className='w-full flex flex-col'>
      <h1 className='text-4xl font-bold'>Sign Up</h1>
      <div className='flex flex-1 items-center justify-center'>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col mb-6'>
            <Input
              name='email'
              label='Email'
              value={email}
              onChange={onChange}
              className='w-96'
            />
            <Input
              type='password'
              name='password'
              label='Password'
              value={password}
              onChange={onChange}
              className='w-96'
            />
            <Input
              type='password'
              name='confirm-password'
              label='Confirm password'
              value={confirmPassword}
              onChange={onChange}
              className='w-96'
            />
          </div>
          <Button type='submit' className='w-full' isDisabled={isCreating}>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Page
