import 'colors'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import { errorHandler, notFount } from './app/middleware/error.middleware.js'

import authRoutes from './app/auth/auth.routes.js'
import userRoutes from './app/user/user.routes.js'

const PORT = process.env.PORT || 5000
const app = express()
const __dirname = path.resolve()

async function main() {
	if (process.env.NODE_ENV == 'development') {
		app.use(morgan('dev'))
	}
	app.use(cors())
	app.use(express.json())
	app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
	app.use('/api', userRoutes, authRoutes)

	app.use(notFount)
	app.use(errorHandler)

	app.listen(PORT, () => {
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
				.bold
		)
	})
}

main()
// .then(async () => {
// 	await prisma.$disconnect()
// })
// .catch(async e => {
// 	console.error(e)
// 	await prisma.$disconnect()
// 	process.exit(1)
// })
