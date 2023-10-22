import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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

  res.status(200).json({ id: user.id, email: user.email })
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('access_token')
  res.clearCookie('refresh_token')

  res.end()
}

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token

  if (!refreshToken) {
    return res.status(401).send('Access Denied. No refresh token provided.')
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
    const { accessToken } = createTokens(decoded)

    res.cookie('access_token', accessToken, { httpOnly: true, secure: true })
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    return res.status(400).send('Invalid refresh token.')
  }
}
