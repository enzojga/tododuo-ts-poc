import { Router } from "express";
import { createCategory, listAllCategories } from "../controllers/categoriesController.js";
import { verifyToken } from "../middlewares/tokenMiddleware.js";

const categoryRouter: Router = Router();

categoryRouter.post("/category", verifyToken, createCategory);
categoryRouter.get("/category", verifyToken, listAllCategories);

export default categoryRouter;