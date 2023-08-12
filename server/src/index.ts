import express, { Express } from 'express'
import dotenv from 'dotenv'
import users from '@/routes/users.js'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.end('Hello World!')
})

app.use('/users', users)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})