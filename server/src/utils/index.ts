import jwt from 'jsonwebtoken'

export const createAccessToken = (email: string) => {
  const expirationTime = 300

  const token = jwt.sign(
    { email },
    process.env.TOKEN_KEY,
    {
      algorithm: 'HS256',
      expiresIn: expirationTime
    }
  )

  return token
}