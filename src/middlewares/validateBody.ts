import { Request, Response } from "express";
import type { RequestHandler } from "express";
import { ObjectSchema } from "joi";

const validateSchema = (schema: ObjectSchema, body) => {
    const {error} = schema.validate(body);
    if(error){
        return false;
    }
    return true;
}

export const verifyBody: RequestHandler = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next) => { 
        const hasError = await validateSchema(schema, req.body);
        if(hasError){
            next();
            return;
        }else{
            res.sendStatus(422);
            return;
        }
    }
}
