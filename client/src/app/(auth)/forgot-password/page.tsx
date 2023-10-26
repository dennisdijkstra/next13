'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import useSWRMutation from 'swr/mutation'
import * as yup from 'yup'
import { register as fetcher } from '@/api'
import { capitalize } from '@/utils'
import Link from 'next/link'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { ArrowRight } from '@phosphor-icons/react'

const schema = yup.object().shape({
  email: yup.string().email().required(),
})

const Page = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const { trigger: register, isMutating: isLoading } = useSWRMutation('auth/register', fetcher)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')

    setEmail(e.currentTarget.value)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await schema.validate({ email }, { abortEarly: false })
    } catch (error) {
      setError(error.errors[0])
      return
    }
  }

  return (
    <>
      <h1 className='text-4xl font-bold'>Forgot your password?</h1>
      <div className='flex flex-1 items-center justify-center'>
        <form onSubmit={onSubmit} className="relative">
          <div className='flex flex-col mb-8'>
            <Input
              name='email'
              label='Email'
              value={email}
              onChange={onChange}
              className='w-96'
            />
          </div>
          {error && <p className="text-sm text-red-600 absolute bottom-[124px]">{capitalize(error)}</p>}
          <Button type='submit' className='w-full mb-4' isDisabled={isLoading}>
            Request reset link
            <ArrowRight size={24} weight="bold" className="ml-1" />
          </Button>
          <Link href="/login" className="float-right underline">Back to login</Link>
        </form>
      </div>
    </>
  )
}

export default Page
