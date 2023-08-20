import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token

  if (! token) {
    return res.status(403).send('A token is required for authentication')
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    req.body.user = decoded

    next()
  } catch (err) {
    return res.status(401).send('Invalid token')
  }
}