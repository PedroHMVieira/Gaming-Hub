import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "../types/jwtPayload";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("Token recebido:", token);

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token" });
  }

  try {
    const decoded = verifyToken(token) as JwtPayload;

    console.log("Token decodificado:", decoded);

    req.body.user = decoded;

    next();
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    return res.status(401).json({ error: "Access denied. Invalid token" });
  }
};
