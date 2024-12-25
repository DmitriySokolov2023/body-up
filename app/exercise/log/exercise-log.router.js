import express from 'express'

import { protect } from '../../middleware/auth.middleware.js'

import {
	completeExerciseLog,
	createNewExerciseLog,
	getExerciseLog,
	getExerciseLogList,
	updateExerciseLog
} from './exercise-log.controller.js'

const router = express.Router()

router.route('/exercises/log/:id').post(protect, createNewExerciseLog)
router.route('/exercises/log/:id').get(protect, getExerciseLog)
router.route('/exercises/log/time/:id').put(protect, updateExerciseLog)
router.route('/exercises/log').get(protect, getExerciseLogList)
router.route('/exercises/log/complete/:id').patch(protect, completeExerciseLog)
export default router
