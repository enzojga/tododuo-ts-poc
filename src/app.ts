import express from "express";
import testDb from "./controllers/registerController.js";
const app = express();
app.get("/", testDb);

app.listen(5000, () => {
    console.log("Ouvindo porta 5000");
})