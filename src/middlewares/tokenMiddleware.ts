import { getSessions } from "../repositories/sessionsRepositorie.js";
import { Request, Response } from "express";
import type { RequestHandler } from "express";

export const verifyToken: RequestHandler = async (req: Request, res: Response, next) => {
    try{
        const { authorization } = req.headers;
        const tokenHeader: String = authorization?.replace('Bearer ', '');

        const session = await getSessions(tokenHeader);

        if(!session.rows[0]){
            return res.sendStatus(401);
        }
        res.locals.user_id = session.rows[0].user_id;

        return next();
    }catch (err){
        res.sendStatus(500);
    }
}
