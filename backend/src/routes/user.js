import express from 'express'
import { getProfile, updateHouse, toggleFavoriteSpell } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/profile', protect, getProfile)
router.put('/house', protect, updateHouse)
router.put('/spells/favorite', protect, toggleFavoriteSpell)

export default router