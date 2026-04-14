import { Request, Response } from "express";
import DevModel from "../models/DevModel";

export const getAllDevs = async (req: Request, res: Response) => {
  try {
    const loggedUserId = (req as any).user?.id;

    const devs = await DevModel.findAll({
      where: { userId: loggedUserId }
    });

    res.send(devs);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch developers" });
  }
};

export const createDev = async (req: Request, res: Response) => {
  const { name } = req.body;
  const loggedUserId = (req as any).user?.id;

  try {
    const newDev = await DevModel.create({
      name,
      userId: loggedUserId
    });

    res.status(201).send(newDev);
  } catch (error) {
    res.status(500).send({ error: "Failed to create developer/studio" });
  }
};

export const updateDev = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const loggedUserId = (req as any).user?.id;

  try {
    const updatedDev = await DevModel.update(
      { name },
      {
        where: {
          id,
          userId: loggedUserId
        }
      }
    );

    if (updatedDev[0] === 0) {
      res.status(404).send({ error: "Developer not found or permission denied" });
    } else {
      res.send({ message: "Developer updated successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to update developer" });
  }
};

export const deleteDev = async (req: Request, res: Response) => {
  const { id } = req.params;
  const loggedUserId = (req as any).user?.id;

  try {
    const deleted = await DevModel.destroy({
      where: {
        id,
        userId: loggedUserId
      }
    });

    if (deleted) {
      res.send({ message: "Developer deleted successfully" });
    } else {
      res.status(404).send({ error: "Developer not found or permission denied" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to delete developer" });
  }
};