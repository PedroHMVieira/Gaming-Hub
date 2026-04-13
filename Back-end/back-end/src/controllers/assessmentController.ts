import { Request, Response } from "express";
import AssessmentModel from "../models/AssessmentModel";
import { addCommentService } from "../services/AssessmentService";

export const getAllAssessments = async (req: Request, res: Response) => {
  try {
    const assessments = await AssessmentModel.findAll();
    return res.status(200).json(assessments);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar avaliações", error });
  }
};

export const addComment = async (req: Request, res: Response) => {
  const { comment, score } = req.body;
  const { id: gameId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  try {
    const newEntry = await addCommentService(token, gameId, comment, score);
    return res.status(201).json(newEntry);
  } catch (error) {
    const err = error as { status?: number; message: string };
    return res.status(err.status || 500).json({ error: err.message });
  }
};