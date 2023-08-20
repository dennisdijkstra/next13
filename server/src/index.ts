import express, { Express } from 'express'
import dotenv from 'dotenv'
import auth from '@/routes/auth.js'
import users from '@/routes/users.js'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use('/', auth)
app.use('/users', users)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})