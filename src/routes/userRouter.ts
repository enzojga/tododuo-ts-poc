import { Router } from "express";
import { signupUser, signIn } from "../controllers/registerController.js";

const userRoutes: Router = Router();

userRoutes.post("/signup", signupUser);
userRoutes.post("/signin", signIn)

export default userRoutes;