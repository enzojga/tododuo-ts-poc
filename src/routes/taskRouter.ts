import { Router } from "express";
import { verifyToken } from "../middlewares/tokenMiddleware.js";
import { atributeDayToTask, changeDescription, createTaks, deleteTask, listTodayTasks, listAllTasks } from "../controllers/taskController.js";

const taskRouter: Router = Router();

taskRouter.post("/task", verifyToken, createTaks);
taskRouter.get("/task", verifyToken, listAllTasks);
taskRouter.delete("/task/:id", verifyToken, deleteTask);
taskRouter.put("/task/:id", verifyToken, changeDescription);
taskRouter.post("/task/day/:id",verifyToken, atributeDayToTask);
taskRouter.get("/task/today", verifyToken, listTodayTasks);

export default taskRouter;