"use client"

import { useState, ChangeEvent } from "react"
import Input from "../components/Input"

const Page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "email") {
      setEmail(e.currentTarget.value)
      return
    }

    setPassword(e.currentTarget.value)
  }

  return (
    <div className='w-full flex flex-col'>
      <h1 className='text-4xl font-bold'>Sign Up</h1>
      <div className='flex flex-1 items-center justify-center'>
        <form className='flex flex-col'>
          <Input
            name='email'
            label='Email'
            value={email}
            onChange={onChange}
            className='w-80'
          />
          <Input
            type='password'
            name='password'
            label='Password'
            value={password}
            onChange={onChange}
            className='w-80'
          />
          <Input
            type='password'
            name='confirm-password'
            label='Confirm password'
            value={password}
            onChange={onChange}
            className='w-80'
          />
        </form>
      </div>
    </div>
  )
}

export default Page
