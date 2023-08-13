import { RequestHandler } from 'express'
import prisma from '@/client.js'

export const getUser: RequestHandler = (req, res) => {
  res.status(200).json({ message: 'Returned user' })
}

export const createUser: RequestHandler = (req, res) => {
  res.status(201).json({ message: 'Created user' })
}