import { Router } from 'express'
import { createUser, getUser } from '@/controllers/users.js'

const router = Router()

router.post('/', createUser)
router.get('/', getUser)
router.patch('/:id')
router.delete('/:id')

export default router