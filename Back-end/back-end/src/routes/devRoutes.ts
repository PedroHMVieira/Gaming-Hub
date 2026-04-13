import { Router } from "express";
import {
  getAllDevs,
  createDev,
  updateDev,
  deleteDev,
} from "../controllers/devController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllDevs);

router.post("/", authMiddleware, createDev);

router.put("/:id", authMiddleware, updateDev);

router.delete("/:id", authMiddleware, deleteDev);

export default router;