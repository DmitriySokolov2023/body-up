import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

export const getUserProfile = asyncHandler(async(req, res) =>{
		res.send('HI')
} )
export const addUser = asyncHandler(async(req, res) =>{
	const user = await prisma.user.create({
		data:{
			email:"test@test.ru",    
			name:"Dima",     
			password:'123', 
			images:['213','2134'] 
		}
	})
	res.json(user)
})