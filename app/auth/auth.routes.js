import express from 'express'

import { login, register } from './auth.controller.js'

const router = express.Router()

router.route('/users/login').post(login)
router.route('/users/register').post(register)

export default router
