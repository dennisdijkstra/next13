import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token

  if (! accessToken) {
    return res.status(403).send('A token is required for authentication')
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET)
    req.body.user = decoded

    next()
  } catch (err) {
    return res.status(401).send('Invalid token')
  }
}