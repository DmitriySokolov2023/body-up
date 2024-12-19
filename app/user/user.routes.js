import express from 'express'
import { addUser, getUserProfile } from './user.controller.js'

const router = express.Router()

router.route('/user/profile').get(getUserProfile)
router.route('/user').post(addUser)

export default router