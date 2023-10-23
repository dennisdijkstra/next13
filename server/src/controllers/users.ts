import { RequestHandler } from 'express'
import { getUserByIdOrEmail } from '@/services/users.js'

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params
  const user = await getUserByIdOrEmail({ id: parseInt(id) })

  res.status(200).json({ id: user.id, email: user.email })
}

