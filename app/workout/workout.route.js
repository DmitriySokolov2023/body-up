import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import { getWorkoutLog } from './log/get-workout-log.controller.js'
import { updateCompleteWorkoutLog } from './log/update-workout-log.controller.js'
import { addWorkoutLog } from './log/workout-log.controller.js'
import {
	addWorkout,
	deleteWorkout,
	getAllWorkout,
	getWorkout,
	updateWorkout
} from './workout.controller.js'

const router = express.Router()

router.route('/workouts').post(protect, addWorkout)
router.route('/workouts/:id').get(protect, getWorkout)
router.route('/workouts').get(protect, getAllWorkout)
router.route('/workouts/:id').put(protect, updateWorkout)
router.route('/workouts/:id').delete(protect, deleteWorkout)

router.route('/workouts/log/:id').post(protect, addWorkoutLog)
router.route('/workouts/log/:id').get(protect, getWorkoutLog)
router
	.route('/workouts/log/complete/:id')
	.patch(protect, updateCompleteWorkoutLog)
export default router
