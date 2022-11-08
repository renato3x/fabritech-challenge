import 'express-async-errors'

import express from 'express'
import indexRouter from '@routes/indexRoutes'
import addressRouter from '@routes/addressRoutes'
import ErrorHandler from '@middlewares/ErrorHandler'

import '@database/connection'

const app = express()

// json config
app.use(express.json())

//routes
app.use(indexRouter)
app.use(addressRouter)
app.use(ErrorHandler)

export default app
