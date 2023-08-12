import { RequestHandler } from 'express'

export const getUser: RequestHandler = (req, res) => {
  res.status(200).json({ message: 'Returned user' })
}

export const createUser: RequestHandler = (req, res) => {
  console.log(req)

  res.status(201).json({ message: 'Created user' })
}