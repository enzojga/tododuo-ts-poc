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
            res.sendStatus(401);
            return;
        }
        await registerUser(newUser);
        res.status(201).send("OK");
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
}

const signIn = async (req: Request, res: Response) => {
    try {
        const loginUser = req.body as User;
        const verifyUser = await getUser(loginUser);
        if(verifyUser.rows.length === 0){
            res.sendStatus(401);
            return;
        }
        if(loginUser.password !== verifyUser.rows[0].password){
            res.sendStatus(401);
            return;
        }
        
        const token: string = uuidv4();
        await insertSection({user_id: verifyUser.rows[0].id, token});

        res.status(200).send(token);
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
}

export {signupUser, signIn};