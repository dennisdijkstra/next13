import redis from '@/redisClient.js'
import { Request, Response, NextFunction } from 'express'

export const cache = async (req: Request, res: Response, next: NextFunction) => {
  const cacheKey = req.originalUrl

  try {
    const response = await redis.get(cacheKey)

    if (response) {
      res.send(JSON.parse(response))
    } else {
      next()
    }
  } catch (error) {
    throw error
  }
}