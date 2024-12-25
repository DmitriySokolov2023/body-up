import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

export const protect = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]

		const decode = jwt.decode(token, process.env.ACCESS_TOKEN)

		const userFound = await prisma.user.findUnique({
			where: {
				id: decode.userId
			},
			select: UserFields
		})

		if (userFound) {
			req.user = userFound
			next()
		} else {
			res.status(401)
			throw new Error('Not authorized')
		}
	}
	if (!token) {
		throw new Error('Token is not defined')
	}
})
