import { Request, Response } from "express";
import { Authrequest } from "../types";
import Task from "../models/task.model";

export const getTasks = async (req: Authrequest, res: Response) => {
  const tasks = await Task.find({
    user: req.user?.id,
  }).populate("user");
  res.json(tasks);
};

export const createTask = async (req: Authrequest, res: Response) => {
  const { title, description, date } = req.body;

  const newTask = new Task({
    title,
    description,
    date,
    user: req.user?.id,
  });

  const savedTask = await newTask.save();
  res.json(savedTask);
};

export const getTask = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id).populate("user");
  if (!task) return res.status(404).json({ message: "task not found" });
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "task not found" });
  return res.sendStatus(204);
};

export const putTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "task not found" });
  res.json(task);
};
