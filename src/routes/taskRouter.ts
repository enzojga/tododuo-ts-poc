import { Router } from "express";
import { verifyToken } from "../middlewares/tokenMiddleware.js";
import { createTaks, deleteTask, listAllTasks } from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter.post("/task", verifyToken, createTaks);
taskRouter.get("/task", verifyToken, listAllTasks);
taskRouter.delete("/task/:id", verifyToken, deleteTask);

export default taskRouter;