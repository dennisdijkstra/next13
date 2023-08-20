import { RequestHandler } from 'express'

export const getUser: RequestHandler = (req, res) => {
  res.status(200).json({ message: 'Get user' })
}

