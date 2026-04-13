import { Router } from "express";
import {
  getAllAssessments,
  addComment,
} from "../controllers/assessmentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/assessments", getAllAssessments);

router.post("/games/:id/assessments/addComment", authMiddleware, addComment);

export default router;