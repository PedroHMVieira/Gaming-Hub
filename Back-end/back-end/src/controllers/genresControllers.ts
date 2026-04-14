import { Request, Response } from "express";
import Genre from "../models/GenreModel";

export const getAllGenres = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const loggedUserId = (req as any).user?.id;

    const genres = await Genre.findAll({
      where: { userId: loggedUserId }
    });

    return res.status(200).json(genres);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar gêneros de jogos",
      error
    });
  }
};

export const createGenre = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.body;
    const loggedUserId = (req as any).user?.id;

    const newGenre = await Genre.create({
      name,
      userId: loggedUserId
    } as any);

    return res.status(201).json(newGenre);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar gênero",
      error
    });
  }
};

export const updateGenre = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const loggedUserId = (req as any).user?.id;

    const genre = await Genre.findOne({
      where: { id, userId: loggedUserId }
    });

    if (!genre) {
      return res.status(404).json({ message: "Gênero não encontrado ou sem permissão" });
    }

    await genre.update({ name });
    return res.status(200).json(genre);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar gênero",
      error
    });
  }
};

export const deleteGenre = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const loggedUserId = (req as any).user?.id;

    const genre = await Genre.findOne({
      where: { id, userId: loggedUserId }
    });

    if (!genre) {
      return res.status(404).json({ message: "Gênero não encontrado ou sem permissão" });
    }

    await genre.destroy();
    return res.status(200).json({ message: "Gênero deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar gênero",
      error
    });
  }
};