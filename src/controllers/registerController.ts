import { Request, Response } from "express";
import { User } from "../protocols/userProtocols.js";
import { getUser, registerUser } from "../repositories/usersRepositories.js";
import { v4 as uuidv4 } from 'uuid';
import { insertSection } from "../repositories/sessionsRepositorie.js";

const signupUser = async (req: Request, res: Response) => {
    try {
        const newUser = req.body as User;

        const verifyName = await getUser(newUser);
        if (verifyName.rows.length !== 0) {
            return res.sendStatus(401);
        }
        await registerUser(newUser);

        return res.status(200).send("OK");
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

const signIn = async (req: Request, res: Response) => {
    try {
        const loginUser = req.body as User;
        const verifyUser = await getUser(loginUser);
        if(verifyUser.rows.length === 0){
            return res.sendStatus(401);
        }
        if(loginUser.password !== verifyUser.rows[0].password){
            return res.sendStatus(401)
        }
        
        const token: string = uuidv4();
        await insertSection({user_id: verifyUser.rows[0].id, token});

        return res.status(200).send(token);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export {signupUser, signIn};