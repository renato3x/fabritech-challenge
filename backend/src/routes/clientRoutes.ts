import { Router } from "express";
import ClientController from "@controllers/ClientController";

const router = Router()

router.get('/client', ClientController.index)
router.post('/client', ClientController.create)

export default router
