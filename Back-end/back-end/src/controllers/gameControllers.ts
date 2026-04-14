import { Request, Response } from "express";
import { Op } from "sequelize";
import GameModel from "../models/GameModel";
import DevModel from "../models/DevModel";
import GenreModel from "../models/GenreModel";
import AssessmentModel from "../models/AssessmentModel";
import UserModel from "../models/UserModel";

export const getAllGames = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const offset = (pageNumber - 1) * limitNumber;

    const loggedUserId = (req as any).user?.id;

    if (!loggedUserId) {
      return res.status(401).json({ error: "Usuário não identificado." });
    }

    const { rows: games, count: total } = await GameModel.findAndCountAll({
      limit: limitNumber,
      offset,
      distinct: true,
      where: {
        userId: loggedUserId
      },
      include: [
        { model: DevModel, as: "developers", attributes: ["id", "name"] },
        { model: GenreModel, as: "genres", attributes: ["id", "name"] },
        {
          model: AssessmentModel,
          as: "assessments",
          include: [{ model: UserModel, as: "user", attributes: ["id", "name"] }],
        },
      ],
    });

    res.json({
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      data: games,
    });
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    res.status(500).json({ error: "Erro interno ao buscar jogos." });
  }
};

export const getGameById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const loggedUserId = (req as any).user?.id;
    const game = await GameModel.findByPk(req.params.id, {
      include: [
        { model: DevModel, as: "developers", attributes: ["id", "name"] },
        { model: GenreModel, as: "genres", attributes: ["id", "name"] },
        {
          model: AssessmentModel,
          as: "assessments",
          include: [{ model: UserModel, as: "user", attributes: ["id", "name"] }],
        },
      ],
    });

    if (!game) return res.status(404).json({ error: "Jogo não encontrado" });

    if (game.userId !== loggedUserId) {
      return res.status(403).json({ error: "Acesso negado. Este projeto não pertence a você." });
    }

    return res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar detalhes do jogo." });
  }
};

export const addGame = async (req: Request, res: Response) => {
  try {
    const { title, description, authorIds, categoryIds, score, comment, coverImage } = req.body;
    const loggedUserId = (req as any).user?.id;

    if (!loggedUserId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (!title || !description) {
      return res.status(400).json({ error: "Título e descrição são obrigatórios." });
    }

    const newGame = await GameModel.create({
      title,
      description,
      userId: loggedUserId,
      coverImage
    });

    if (authorIds && Array.isArray(authorIds) && authorIds.length > 0) {
      try {
        if ((newGame as any).addDevelopers) {
          await (newGame as any).addDevelopers(authorIds);
        } else if ((newGame as any).addDevs) {
          await (newGame as any).addDevs(authorIds);
        }
      } catch (assocError) {
        console.error("Erro na associação de Devs:", assocError);
      }
    }

    if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
      try {
        if ((newGame as any).addGenres) {
          await (newGame as any).addGenres(categoryIds);
        } else if ((newGame as any).addCategories) {
          await (newGame as any).addCategories(categoryIds);
        }
      } catch (assocError) {
        console.error("Erro na associação de Gêneros:", assocError);
      }
    }

    if (score !== undefined && score !== null) {
      await AssessmentModel.create({
        gameId: newGame.id,
        userId: loggedUserId,
        score: Number(score),
        comment: comment || "",
      });
    }

    const fullGame = await GameModel.findByPk(newGame.id, {
      include: [
        { model: DevModel, as: "developers" },
        { model: GenreModel, as: "genres" }
      ],
    });

    return res.status(201).json(fullGame);

  } catch (error: any) {
    return res.status(500).json({
      error: "Erro interno ao adicionar jogo.",
      details: error.message
    });
  }
};

export const updateGame = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { title, description, coverImage } = req.body;
    const loggedUserId = (req as any).user?.id;

    const game = await GameModel.findByPk(req.params.id);

    if (!game) return res.status(404).json({ error: "Jogo não encontrado" });

    if (game.userId !== loggedUserId) {
      return res.status(403).json({ error: "Você não tem permissão para editar este projeto." });
    }

    await game.update({ title, description, coverImage });
    return res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Erro interno ao atualizar o jogo." });
  }
};

export const deleteGame = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const loggedUserId = (req as any).user?.id;
    const game = await GameModel.findByPk(req.params.id);

    if (!game) return res.status(404).json({ error: "Jogo não encontrado" });

    if (game.userId !== loggedUserId) {
      return res.status(403).json({
        error: "Acesso negado. Este projeto pertence a outro usuário."
      });
    }

    await game.destroy();
    return res.json({ message: "Jogo deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno ao deletar o jogo." });
  }
};