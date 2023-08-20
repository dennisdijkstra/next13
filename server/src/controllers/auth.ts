import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { createUser, getUser } from '@/services/users.js'

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (! email || ! password) {
    res.status(400).json({ message: 'Email and password are required'})
  }

  const existingUser = await getUser(email)
  if (existingUser) {
    res.status(409).json({ message: 'User already exists'})
  }

  const user = await createUser(email, password)
  //  res.cookie('token', accessToken, { maxAge: 300 * 1000 })
  res.status(201).json({ user })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (! email || ! password) {
    res.status(400).json({ message: 'Email and password are required'})
  }

  const user = await getUser(email)
  if (! user) {
    res.status(401).json({ message: 'Unauthorized'})
  }

  const match = bcrypt.compare(password, user.password)
  if (! match) {
    res.status(401).json({ message: 'Unauthorized'})
  }

  //  const accessToken = createAccessToken(user.email)
  //  res.cookie('token', accessToken, { maxAge: 300 * 1000 })
  res.status(200).json({ message: 'Logged in' })
}

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout' })
}

export const refreshToken = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Refresh access token' })
}

