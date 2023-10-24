import { Router } from 'express'
import { getUser } from '@/controllers/users.js'

const router = Router()

router.get('/me', getUser)
router.get('/:id', getUser)
router.patch('/:id')
router.delete('/:id')

export default router