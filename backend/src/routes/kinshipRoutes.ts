import { Router } from "express";
import KinshipController from '@controllers/KinshipController'

const router = Router()

router.post('/kinship', KinshipController.create)
router.put('/kinship', KinshipController.update)

export default router
