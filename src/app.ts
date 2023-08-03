import express, {Express, Request, Response} from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

const app:Express = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// logger
app.use(morgan('tiny'))

// cookies
app.use(cookieParser())

export default app