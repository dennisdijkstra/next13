import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

export const createTokens = (user) => {
  const { id, email } = user

  const accessToken = jwt.sign(
    { id, email },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      algorithm: 'HS256',
      //   expiresIn: '5m'
      expiresIn: '10s'
    }
  )

  const refreshToken = jwt.sign(
    { id, email },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '7 days'
    }
  )

  return { accessToken, refreshToken }
}
