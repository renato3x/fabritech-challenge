import { Router } from "express";
import ClientController from "@controllers/ClientController";
import TokenVerify from "@middlewares/TokenVerify";

const router = Router()

router.get('/client', [ TokenVerify ], ClientController.index)
router.get('/client/:id', [ TokenVerify ], ClientController.findById)
router.post('/client', [ TokenVerify ], ClientController.create)
router.delete('/client/:id', [ TokenVerify ], ClientController.delete)
router.put('/client', [ TokenVerify ], ClientController.update)

export default router
