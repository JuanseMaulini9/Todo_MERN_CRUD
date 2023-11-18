import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";
import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  putTask,
} from "../controllers/tasks.controller";
const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTask);
router.post("/tasks", authRequired, createTask);
router.delete("/tasks/:id", authRequired, deleteTask);
router.put("/tasks/:id", authRequired, putTask);

export default router;
