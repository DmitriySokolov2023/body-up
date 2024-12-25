import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import {
	addExercise,
	deleteExercise,
	getAllExercise,
	updateExercise
} from './exercise.controller.js'

const router = express.Router()

router.route('/exercises').post(protect, addExercise)
router.route('/exercises').get(protect, getAllExercise)
router.route('/exercises/:id').put(protect, updateExercise)
router.route('/exercises/:id').delete(protect, deleteExercise)

export default router
