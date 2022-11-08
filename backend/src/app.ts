import express from 'express'
import indexRouter from '@routes/index'
import addressRouter from '@routes/address'

import '@database/connection'

const app = express()

// json config
app.use(express.json())

//routes
app.use(indexRouter)
app.use(addressRouter)

export default app
