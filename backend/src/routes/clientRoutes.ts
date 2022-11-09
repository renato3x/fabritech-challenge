import { Router } from "express";
import ClientController from "@controllers/ClientController";

const router = Router()

router.get('/client', ClientController.index)
router.get('/client/:id', ClientController.findById)
router.post('/client', ClientController.create)
router.delete('/client/:id', ClientController.delete)

export default router
