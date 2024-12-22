import asyncHandler from 'express-async-handler'

export const login = asyncHandler(async (req, res) => {
	res.send('Login')
})
export const register = asyncHandler(async (req, res) => {
	res.send('register')
})
