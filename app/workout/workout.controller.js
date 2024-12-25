import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

export const addWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body
	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exerciseIds.map(id => ({
					id: +id
				}))
			}
		},
		include: { exercises: true }
	})

	res.json(workout)
})

export const getWorkout = asyncHandler(async (req, res) => {
	const workout = await prisma.workout.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			exercises: true
		}
	})

	if (!workout) {
		res.status(404)
		throw new Error('Workout not found')
	}
	const minutes = Math.ceil(workout.exercises.length * 3.7)
	res.json({ ...workout, minutes })
})
export const getAllWorkout = asyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany()

	res.json(workouts)
})
export const updateWorkout = asyncHandler(async (req, res) => {
	const { exerciseIds } = req.body
	try {
		const workout = await prisma.workout.update({
			where: {
				id: +req.params.id
			},
			data: {
				exercises: {
					set: exerciseIds.map(id => ({
						id: +id
					}))
				}
			},

			include: {
				exercises: true
			}
		})

		res.json(workout)
	} catch (e) {
		console.log(e)
	}
})
export const deleteWorkout = asyncHandler(async (req, res) => {
	const workout = await prisma.workout.delete({
		where: {
			id: +req.params.id
		}
	})

	res.json(workout)
})
