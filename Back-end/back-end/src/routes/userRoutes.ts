import express from "express";
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  destroyUserById,
} from "../controllers/userControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", createUser);

router.get("/", authMiddleware, getAll);

router.get("/:id", authMiddleware, getUserById);

router.put("/:id", authMiddleware, updateUser);

router.delete("/:id", authMiddleware, destroyUserById);

export default router;