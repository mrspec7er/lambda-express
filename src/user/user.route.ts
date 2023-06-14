import { Router } from "express";
import userController from "./user.controller";

const router = Router();

router.post("/", userController.register);
router.get("/", userController.getAll);

export default router;
