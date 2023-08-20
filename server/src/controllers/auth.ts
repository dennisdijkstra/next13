import { RequestHandler } from 'express'

export const register: RequestHandler = (req, res) => {
  res.status(201).json({ message: 'Created user' })
}

export const login = (req, res) => {
  res.status(200).json({ message: 'Login' })
}

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logout' })
}

export const refresh = (req, res) => {
  res.status(200).json({ message: 'Refresh access token' })
}

