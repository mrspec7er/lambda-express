import { Router } from "express";
import articleController from "./article.controller";
import { verifyUser } from "../middleware/verifyUser";

const router = Router();

router.post("/", articleController.create);
router.get("/", articleController.getAll);
router.post("/:id", verifyUser, articleController.publish);

export default router;
