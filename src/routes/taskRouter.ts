import { Router } from "express";
import { verifyToken } from "../middlewares/tokenMiddleware.js";
import { atributeDayToTask, changeDescription, createTaks, deleteTask, listTodayTasks, listAllTasks } from "../controllers/taskController.js";
import { verifyBody } from "../middlewares/validateBody.js";
import { daySchema, descriptionSchema, taskSchema } from "../schemas/schemas.js";

const taskRouter = Router();

taskRouter.post("/task", verifyToken, verifyBody(taskSchema), createTaks);
taskRouter.get("/task", verifyToken, listAllTasks);
taskRouter.delete("/task/:id", verifyToken, deleteTask);
taskRouter.put("/task/:id", verifyToken, verifyBody(descriptionSchema), changeDescription);
taskRouter.post("/task/day/:id",verifyToken, verifyBody(daySchema), atributeDayToTask);
taskRouter.get("/task/today", verifyToken, listTodayTasks);

export default taskRouter;
