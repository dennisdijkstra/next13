import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authorize } from '@/middleware/auth.js'
import { cache } from '@/middleware/cache.js'
import auth from '@/routes/auth.js'
import users from '@/routes/users.js'

// Load env variables
dotenv.config()

const app: Express = express()
const port = process.env.PORT

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routing
app.use(cache)
app.use('/auth', auth)
app.use(authorize)
app.use('/users', users)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})