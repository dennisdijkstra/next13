import { Router } from 'express'
import { getUser, updateUser } from '@/controllers/users.js'

const router = Router()

router.get('/me', getUser)
router.get('/:id', getUser)
router.patch('/:id', updateUser)
router.delete('/:id')

export default router