import prisma from '@/client.js'
import { hashPassword } from '@/services/auth.js'

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password)

  const data = { email, password: hashedPassword }
  const user = await prisma.user.create({ data })
  return user
}

export const getUser = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email }
  })
  return user
}