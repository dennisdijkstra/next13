import bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import prisma from '@/client.js'
import { createUser, getUserByIdOrEmail } from '@/services/users.js'
import { createTokens } from '@/services/auth.js'
import { sendEmail } from '@/services/mail.js'

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (! email || ! password) {
    return res.status(400).json({ message: 'Email and password are required'})
  }

  const existingUser = await getUserByIdOrEmail({ email })
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists'})
  }

  const user = await createUser(email, password)

  const { accessToken, refreshToken} = createTokens(user)
  res.cookie('access_token', accessToken, { httpOnly: true, secure: true })
  res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true })

  await sendEmail({
    to: email,
    subject: 'Welcome',
    html: '<bold>Thanks for registering!</bold>',
  })

  res.status(201).json({ id: user.id })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (! email || ! password) {
    return res.status(400).json({ message: 'Email and password are required'})
  }

  const user = await getUserByIdOrEmail({ email })
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

  res.status(200).json({ id: user.id })
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

export const requestResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body

  const user = await getUserByIdOrEmail({ email })
  if (! user) {
    return res.json({ status: 'ok' })
  }

  // await prisma.resetToken.update({
  //   where: {
  //     email: user.email,
  //   },
  //   data: {
  //     isUsed: true,
  //   }
  // })

  const fpSalt = crypto.randomBytes(64).toString('base64')
  const expiresAt = new Date(new Date().getTime() + (60 * 60 * 1000))

  const { token } = await prisma.resetToken.create({
    data: {
      email,
      expiresAt,
      token: fpSalt,
      isUsed: false,
    },
    select: {
      token: true,
    }
  })

  await sendEmail({
    to: email,
    subject: 'Password reset',
    html: `<bold>To reset your password, please click the link below.\n\nhttp://${process.env.DOMAIN}/reset-password?token=${encodeURIComponent(token)}&email=${email}</bold>`,
  })

  return res.json({ status: 'ok' })
}

export const validateResetPassword = async (req: Request, res: Response) => {
  const { email, token } = req.query

  if (! email || ! token) {
    return res.status(403).send('Access Denied. No token and or email provided.')
  }

  const record = await prisma.resetToken.findFirst({
    where: {
      email,
      token,
      expiresAt: {
        gte: new Date()
      }
      isUsed: false,
    },
  })

  if (record == null) {
    return res.json({ status: 'failed' })
  }

  return res.status(200).json({ status: 'success' })
}

export const resetPassword = async (req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' })
}
