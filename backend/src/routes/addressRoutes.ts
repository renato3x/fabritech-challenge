import { Router } from "express";
import AddressController from '@controllers/AddressController'

const router = Router()

router.post('/address', AddressController.create)
router.put('/address', AddressController.update)

export default router
