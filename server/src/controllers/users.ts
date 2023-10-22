import { RequestHandler } from 'express'
import { getUser as lol } from '@/services/users.js'


export const getUser: RequestHandler = async (req, res) => {
  const { email } = req.body
  const user = await lol(email)

  res.status(200).json({ id: user.id, email: user.email })
}

