import jwt from "jsonwebtoken";
import AssessmentModel from "../models/AssessmentModel";

const validateTokenAndGetUserId = (token: string) => {
  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecret"
    );
    return decoded.id || decoded.user?.id;
  } catch (error) {
    throw { status: 401, message: "Token inválido." };
  }
};

const validateCommentData = (
  gameId: string,
  comment: string,
  score: number
) => {
  if (!gameId || !comment || score == null) {
    throw { status: 400, message: "Todos os campos são obrigatórios." };
  }

  if (typeof score !== "number" || score < 0 || score > 5) {
    throw { status: 400, message: "A pontuação deve estar entre 0 e 5." };
  }

  if (
    typeof comment !== "string" ||
    comment.trim() === "" ||
    comment.length > 500
  ) {
    throw { status: 400, message: "Comentário inválido ou muito longo." };
  }
};

export const addCommentService = async (
  token: string,
  gameId: string,
  comment: string,
  score: number
) => {
  const userId = validateTokenAndGetUserId(token);

  validateCommentData(gameId, comment, score);

  const newAssessment = await AssessmentModel.create({
    comment,
    score,
    gameId: Number(gameId),
    userId: userId,
  });

  return newAssessment;
};