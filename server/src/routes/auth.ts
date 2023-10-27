import { Router } from 'express'
import {
  register,
  login,
  logout,
  refreshAccessToken,
  requestResetPassword,
  validateResetPassword,
  resetPassword,
} from '@/controllers/auth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh-token', refreshAccessToken)
router.post('/forgot-password', requestResetPassword)
router.get('/reset-password', validateResetPassword)
router.post('/reset-password', resetPassword)

export default router