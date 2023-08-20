import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import { createAccessToken } from '@/utils/index.js'
import prisma from '@/client.js'

export const register: RequestHandler = async (req, res) => {
  const { email, password } = req.body
  if (! email || ! password) {
    res.status(400).json({ message: 'Email and password are required'})
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const accessToken = createAccessToken(email)
  const data = { email, password: hashedPassword, accessToken }
  const user = await prisma.user.create({ data })
  
  res.cookie('token', accessToken, { maxAge: 300 * 1000 })
  res.status(201).json({ user, accessToken })
}

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body
  if (! email || ! password) {
    res.status(400).json({ message: 'Email and password are required'})
  }

  const user = await prisma.user.findFirst({
    where: { email }
  })

  if (! user) {
    res.status(401).json({ message: 'Unauthorized'})
  }

  const match = bcrypt.compare(password, user.password)
  if (! match) {
    res.status(401).json({ message: 'Unauthorized'})
  }

  const accessToken = createAccessToken(user.email)
  res.cookie('token', accessToken, { maxAge: 300 * 1000 })

  res.status(200).json({ message: 'Logged in' })
}

export const logout: RequestHandler = (req, res) => {
  res.status(200).json({ message: 'Logout' })
}

export const refreshToken: RequestHandler = (req, res) => {
  res.status(200).json({ message: 'Refresh access token' })
}

