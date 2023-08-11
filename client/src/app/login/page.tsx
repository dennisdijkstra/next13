"use client"

import { useState, ChangeEvent } from "react"
import Input from "@/components/Input"
import Button from "@/components/Button"

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

  const handleClick = () => {
    console.log("Clicked")
  }

  return (
    <div className='w-full flex flex-col'>
      <h1 className='text-4xl font-bold'>Log In</h1>
      <div className='flex flex-1 items-center justify-center'>
        <form>
          <div className='flex flex-col mb-6'>
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
          </div>
          <Button type='submit' onClick={handleClick} className='w-full'>
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Page
