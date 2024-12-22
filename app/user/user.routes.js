import express from 'express'

import { getUserProfile } from './user.controller.js'

const router = express.Router()

router.route('/user/profile').get(getUserProfile)

export default router
