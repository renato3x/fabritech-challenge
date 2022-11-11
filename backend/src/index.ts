import path from 'path'
import dotenv from 'dotenv'

dotenv.config({
  path: path.join(__dirname, '..', '.env')
})

import app from './app'

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('Server open in http://localhost:3000')
})
