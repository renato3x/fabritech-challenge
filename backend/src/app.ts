import 'express-async-errors'

import express from 'express'
import cors from 'cors'
import indexRoutes from '@routes/indexRoutes'
import addressRoutes from '@routes/addressRoutes'
import clientRoutes from '@routes/clientRoutes'
import kinshipRoutes from '@routes/kinshipRoutes'
import userRoutes from '@routes/userRoutes'
import ErrorHandler from '@middlewares/ErrorHandler'

import '@database/connection'

const app = express()

app.use(cors())

// json config
app.use(express.json())

//routes
app.use(indexRoutes)
app.use(addressRoutes)
app.use(clientRoutes)
app.use(kinshipRoutes)
app.use(userRoutes)
app.use(ErrorHandler)

export default app
