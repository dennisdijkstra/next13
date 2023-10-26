import { RequestHandler } from 'express'
import prisma from '@/client.js'
import { getUserByIdOrEmail } from '@/services/users.js'

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.body.user || req.params
  const user = await getUserByIdOrEmail({ id: parseInt(id) })

  delete user.password
  res.status(200).json({ ...user })
}

export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params
  const { firstName, lastName } = req.body

  const user = await prisma.user.update({
    where: { id: parseInt(id)  },
    data: { firstName, lastName },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    }
  })

  res.status(200).json({ ...user })
}

