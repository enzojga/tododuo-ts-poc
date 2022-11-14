import { Router } from "express";
import { signupUser, signIn } from "../controllers/registerController.js";
import { verifyBody } from "../middlewares/validateBody.js";
import { userSchema } from "../schemas/schemas.js";

const userRoutes = Router();

userRoutes.post("/signup", verifyBody(userSchema), signupUser);
userRoutes.post("/signin", verifyBody(userSchema), signIn)

export default userRoutes;