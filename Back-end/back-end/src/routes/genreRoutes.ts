import { Router } from "express";
import {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../controllers/genresControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllGenres);

router.post("/", authMiddleware, createGenre);

router.put("/:id", authMiddleware, updateGenre);

router.delete("/:id", authMiddleware, deleteGenre);

export default router;