import 'express-async-errors'

import express from 'express'
import indexRouter from '@routes/indexRoutes'
import addressRouter from '@routes/addressRoutes'
import clientRouter from '@routes/clientRoutes'
import ErrorHandler from '@middlewares/ErrorHandler'

import '@database/connection'

const app = express()

// json config
app.use(express.json())

//routes
app.use(indexRouter)
app.use(addressRouter)
app.use(clientRouter)
app.use(ErrorHandler)

export default app
