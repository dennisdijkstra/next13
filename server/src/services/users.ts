import prisma from '@/client.js'
import { createAccessToken } from '@/utils/index.js'
import { hashPassword } from '@/services/auth.js'

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password)

  const accessToken = createAccessToken(email)
  const data = { email, password: hashedPassword, accessToken }
  const user = await prisma.user.create({ data })
  return user
}

export const getUser = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email }
  })
  return user
}