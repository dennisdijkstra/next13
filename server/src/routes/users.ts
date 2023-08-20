import { Router } from 'express'
import { getUser } from '@/controllers/users.js'

const router = Router()

router.get('/', getUser)
router.patch('/:id')
router.delete('/:id')

export default router