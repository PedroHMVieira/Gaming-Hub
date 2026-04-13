import { Router } from "express";
import {
  getAllGames,
  getGameById,
  addGame,
  updateGame,
  deleteGame,
} from "../controllers/gameControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllGames);

router.get("/:id", authMiddleware, getGameById);

router.post("/", authMiddleware, addGame);

router.put("/:id", authMiddleware, updateGame);

router.delete("/:id", authMiddleware, deleteGame);

export default router;