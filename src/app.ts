import express from "express";
import categoryRouter from "./routes/categoryRouter.js";
import taskRouter from "./routes/taskRouter.js";
import userRoutes from "./routes/userRouter.js";

const app = express();
app.use(express.json());

app.use(userRoutes);
app.use(taskRouter);
app.use(categoryRouter);

app.listen(5000, () => {
    console.log("Ouvindo porta 5000");
})