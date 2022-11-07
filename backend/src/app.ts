import express from 'express'
import indexRouter from '@routes/index'
import '@database/connection'

const app = express()

// json config
app.use(express.json())

//routes
app.use(indexRouter)

export default app
