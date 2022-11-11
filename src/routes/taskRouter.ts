import { Router } from "express";
import { verifyToken } from "../middlewares/tokenMiddleware.js";
import { changeDescription, createTaks, deleteTask, listAllTasks } from "../controllers/taskController.js";

const taskRouter: Router = Router();

taskRouter.post("/task", verifyToken, createTaks);
taskRouter.get("/task", verifyToken, listAllTasks);
taskRouter.delete("/task/:id", verifyToken, deleteTask);
taskRouter.put("/task/:id", verifyToken, changeDescription);

export default taskRouter;