import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { createUser, getUser } from '@/services/users.js'
import { createTokens } from '@/services/auth.js'

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (! email || ! password) {
    return res.status(400).json({ message: 'Email and password are required'})
  }

  const existingUser = await getUser(email)
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists'})
  }

  const user = await createUser(email, password)

  const { accessToken, refreshToken} = createTokens(user)
  res.cookie('access_token', accessToken, { httpOnly: true, secure: true })
  res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true })

  res.status(201).json({ user })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (! email || ! password) {
    return res.status(400).json({ message: 'Email and password are required'})
  }

  const user = await getUser(email)
  if (! user) {
    return res.status(401).json({ message: 'Unauthorized'})
  }

  const match = await bcrypt.compare(password, user.password)
  if (! match) {
    return res.status(401).json({ message: 'Unauthorized'})
  }

  const { accessToken, refreshToken} = createTokens(user)

  res.cookie('access_token', accessToken, { httpOnly: true, secure: true })
  res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true })

  res.status(200).json({ message: 'Logged in' })
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('access_token')
  res.clearCookie('refresh_token')

  res.end()
}

export const refreshToken = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Refresh access token' })
}

