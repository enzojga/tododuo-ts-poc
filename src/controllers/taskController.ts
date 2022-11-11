import { Request, Response } from "express";
import { Taks } from "../protocols/taskProtocol.js";
import { Description, Id } from "../protocols/genericProtocols.js";
import { deleteTaskById, getAllTasks, getTaskById, inesrtTask, updateDescription } from "../repositories/taskRepositorie.js";

export const createTaks = async (req: Request, res: Response) => {
    try{
        const {name, description} = req.body as Taks;
        console.log(res.locals.user_id);
        await inesrtTask({name, description, user_id: res.locals.user_id});
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const listAllTasks = async (req: Request, res: Response) => {
    try{
        const tasks = await getAllTasks(res.locals.user_id);
        return res.status(200).send(tasks.rows);
    } catch ( err ) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try{
        const { id } = req.params as Id;
        const task = await getTaskById(id);
        if(task.rows.length === 0){
            return res.sendStatus(404);
        }
        if(task.rows[0].user_id !== res.locals.user_id){
            return res.sendStatus(401);
        }
        await deleteTaskById(id);
        return res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const changeDescription = async (req: Request, res: Response) => {
    try{
        const { id } = req.params as Id;
        console.log(req.body);
        const { description } = req.body as Description;
        console.log(description);
        const task = await getTaskById(id);
        if(task.rows.length === 0){
            return res.sendStatus(404);
        }
        if(task.rows[0].user_id !== res.locals.user_id){
            return res.sendStatus(401);
        }
        await updateDescription(id, description);
        res.sendStatus(202);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}