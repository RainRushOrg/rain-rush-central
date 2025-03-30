import { Request, Response } from "express";
import RunModel from "../models/RunModel";
import UserModel from "src/models/UserModel";
import { RunAttributes } from "../models/RunModel";

const User = UserModel; 
const Run = RunModel;   

// submit a new run

const submitRun = async (req: Request, res: Response) => {
  try {
    const { userId, survivor, survivors, difficulty, artifacts, duration, stageCount, items, equipment, kills, deaths, damageDealt, damageTaken, results, deathReason, seed } = req.body;
    console.log(req.body);
    const newRun = await Run.create({ userId, survivor, survivors, difficulty, artifacts, duration, stageCount, items, equipment, kills, deaths, damageDealt, damageTaken, results, deathReason, seed });
    res.status(201).json(newRun);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}
