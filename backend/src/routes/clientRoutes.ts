import { Router } from "express";
import ClientController from "@controllers/ClientController";

const router = Router()

router.get('/client', ClientController.index)

export default router
