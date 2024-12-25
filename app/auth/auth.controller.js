import { faker } from '@faker-js/faker'
import * as argon2 from 'argon2'
import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

import { generateToken } from './generate-token.js'

export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (user) {
		const isPass = await argon2.verify(user.password, password)
		if (!isPass) {
			res.status(401)
			throw new Error('Email or password is not correct')
		} else {
			const token = generateToken(user.id)
			res.json({ user, token })
		}
	} else {
		res.status(401)
		throw new Error('Email or password is not correct')
	}
})

export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	if (password.length < 8) {
		throw new Error('Password must be longer 8 char')
	}

	const oldUser = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (oldUser) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await argon2.hash(password),
			name: faker.name.fullName()
		},
		select: UserFields
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})
