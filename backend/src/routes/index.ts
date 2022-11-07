import { Router } from 'express'
import { IndexController } from '@controllers/index'

const router = Router()

router.get('/', IndexController.index)

export default router
