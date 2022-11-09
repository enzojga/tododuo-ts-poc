import connection from "../database/db.js";
import {Request, Response} from "express";

const testDb = async (req: Request, res: Response) => {
    const users = await connection.query("SELECT * FROM users");
    console.log(typeof(users));
    res.status(200).send(users.rows);
}

export default testDb;