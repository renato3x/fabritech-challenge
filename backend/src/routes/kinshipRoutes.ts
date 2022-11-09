import { Router } from "express";
import KinshipController from '@controllers/KinshipController'

const router = Router()

router.post('/kinship', KinshipController.create)
router.put('/kinship', KinshipController.update)
router.delete('/kinship/:id', KinshipController.delete)

export default router
