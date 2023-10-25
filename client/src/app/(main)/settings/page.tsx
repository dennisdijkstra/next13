'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useAuthStore } from '@/store/authStore'
import { updateUser as fetcher } from '@/api'
import useSWRMutation from 'swr/mutation'
import Input from '@/components/Input'
import Button from '@/components/Button'

const Settings = () => {
  const user = useAuthStore((state) => state.user)
  const { trigger: updateUser } = useSWRMutation(`users/${user?.id}`, fetcher)

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName
    })
  }

  return (
    <div className='w-full'>
      <h1 className='text-4xl font-bold mb-20'>User settings</h1>
      <form onSubmit={onSubmit} className="relative">
        <div className='flex flex-col mb-8'>
          <Input
            name='firstName'
            label='First name'
            value={formData.firstName}
            onChange={onChange}
            className='w-96'
          />
          <Input
            name='lastName'
            label='Last name'
            value={formData.lastName}
            onChange={onChange}
            className='w-96'
          />
          <Input
            name='email'
            label='Email'
            value={formData.email}
            onChange={onChange}
            className='w-96'
            isDisabled
          />
        </div>
        <Button type='submit' className='w-96 mb-4'>
            Save
        </Button>
      </form>
    </div>
  )
}

export default Settings