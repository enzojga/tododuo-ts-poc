import express from "express";
import taskRouter from "./routes/taskRouter.js";
import userRoutes from "./routes/userRouter.js";

const app = express();
app.use(express.json());

app.use(userRoutes);
app.use(taskRouter);


const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
