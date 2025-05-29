import express from 'express'
import { getProfile, changeNickname, updateAvatar } from '../controllers/userController.js'

const router = express.Router()

router.get('/:id', getProfile)
router.put('/:userId/nickname', changeNickname)
router.put('/:userId/avatar', updateAvatar)

export default router
