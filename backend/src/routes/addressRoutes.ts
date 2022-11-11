import { Router } from "express";
import AddressController from '@controllers/AddressController'
import TokenVerify from "@middlewares/TokenVerify";

const router = Router()

router.post('/address', [ TokenVerify ], AddressController.create)
router.put('/address', [ TokenVerify ], AddressController.update)

export default router
