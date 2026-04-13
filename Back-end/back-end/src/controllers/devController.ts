import { Request, Response } from "express";
import DevModel from "../models/DevModel";

export const getAllDevs = async (req: Request, res: Response) => {
  try {
    const devs = await DevModel.findAll();
    res.send(devs);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch developers" });
  }
};

export const createDev = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newDev = await DevModel.create({ name });
    res.status(201).send(newDev);
  } catch (error) {
    res.status(500).send({ error: "Failed to create developer/studio" });
  }
};

export const updateDev = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedDev = await DevModel.update(
      { name },
      { where: { id } }
    );

    if (updatedDev[0] === 0) {
      res.status(404).send({ error: "Developer not found" });
    } else {
      res.send({ message: "Developer updated successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to update developer" });
  }
};

export const deleteDev = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await DevModel.destroy({ where: { id } });
    if (deleted) {
      res.send({ message: "Developer deleted successfully" });
    } else {
      res.status(404).send({ error: "Developer not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to delete developer" });
  }
};