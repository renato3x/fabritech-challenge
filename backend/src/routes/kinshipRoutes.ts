import { Router } from "express";
import KinshipController from '@controllers/KinshipController'
import TokenVerify from "@middlewares/TokenVerify";

const router = Router()

router.post('/kinship', [ TokenVerify ], KinshipController.create)
router.put('/kinship', [ TokenVerify ], KinshipController.update)
router.delete('/kinship/:id', [ TokenVerify ], KinshipController.delete)

export default router
