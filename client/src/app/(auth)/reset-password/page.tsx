'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import * as yup from 'yup'
import { resetPassword as fetcher } from '@/api'
import { capitalize } from '@/utils'
import Link from 'next/link'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { ArrowRight } from '@phosphor-icons/react'

const schema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Your passwords do not match.'),
})

const Page = () => {
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  const router = useRouter()
  const { trigger: resetPassword, isMutating: isLoading } = useSWRMutation('auth/reset', fetcher)

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
      return
    }

    const { error: resetError } = await resetPassword({
      password: data.password
    })

    if (resetError) {
      setError(resetError)
      return
    }

    router.push('/')
  }

  return (
    <>
      <h1 className='text-4xl font-bold'>Reset your password</h1>
      <div className='flex flex-1 items-center justify-center'>
        <form onSubmit={onSubmit} className="relative">
          <div className='flex flex-col mb-8'>
            <Input
              type='password'
              name='password'
              label='New password'
              value={data.password}
              onChange={onChange}
              className='w-96'
            />
            <Input
              type='password'
              name='confirmPassword'
              label='Confirm new password'
              value={data.confirmPassword}
              onChange={onChange}
              className='w-96'
            />
          </div>
          {error && <p className="text-sm text-red-600 absolute bottom-[124px]">{capitalize(error)}</p>}
          <Button type='submit' className='w-full mb-4' isDisabled={isLoading}>
            Reset
            <ArrowRight size={24} weight="bold" className="ml-1" />
          </Button>
          <Link href="/login" className="float-right underline">Back to login</Link>
        </form>
      </div>
    </>
  )
}

export default Page
