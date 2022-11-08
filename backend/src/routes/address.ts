import { Router } from "express";
import { AddressController } from '@controllers/address'

const router = Router()

router.post('/address', AddressController.create)

export default router
