import { Request, Response } from "express";
import { Taks } from "../protocols/taskProtocol.js";
import { Description, Id } from "../protocols/genericProtocols.js";
import { deleteTaskById, getAllTasks, getCountTasksToday, getTaskById, getTasksDaysByTaskIdAndDayId, getTodayTasks, inesrtTask, insertTasksDays, updateDescription } from "../repositories/taskRepositorie.js";
import dayjs from 'dayjs';

export const createTaks = async (req: Request, res: Response) => {
    try{
        const {name, description} = req.body as Taks;
        console.log(res.locals.user_id);
        await inesrtTask({name, description, user_id: res.locals.user_id});
        res.sendStatus(200);
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
}

export const listAllTasks = async (req: Request, res: Response) => {
    try{
        const tasks = await getAllTasks(res.locals.user_id);
        res.status(200).send(tasks.rows);
        return;
    } catch ( err ) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try{
        const { id } = req.params as Id;
        const task = await getTaskById(id);
        if(task.rows.length === 0){
            res.sendStatus(404);
            return;
        }
        if(task.rows[0].user_id !== res.locals.user_id){
            res.sendStatus(401);
            return;
        }
        await deleteTaskById(id);
        res.sendStatus(204);
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
        return;
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
            res.sendStatus(404);
            return;
        }
        if(task.rows[0].user_id !== res.locals.user_id){
            res.sendStatus(401);
            return;
        }
        await updateDescription(id, description);
        res.sendStatus(202);
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
}

export const atributeDayToTask = async (req: Request, res: Response) => {
    try{
        const { id } = req.params as Id;
        const day: Number = req.body.day;
        if(day < 1 || day > 7){
            res.status(422).send("Selecione um dia válido");
            return;
        }
        const task = await getTaskById(id);
        if(task.rows.length === 0){
            res.sendStatus(404);
            return;
        }
        if(task.rows[0].user_id !== res.locals.user_id){
            res.sendStatus(401);
            return;
        }
        const verifyTaskDays = await getTasksDaysByTaskIdAndDayId(day, id);
        if(verifyTaskDays.rows.length !== 0){
            res.status(422).send("Esta tarefa já esta cadastrada no dia selecionado");
            return;
        }
        await insertTasksDays(day, id);
        res.sendStatus(200);
        return;
    } catch ( err ) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
}

export const listTodayTasks = async (req: Request, res: Response) => {
    try{
        const today = (dayjs().day() + 1);
        const todayTasks = await getTodayTasks(today, res.locals.user_id);
        const countTasks = await getCountTasksToday(today, res.locals.user_id);
        console.log(countTasks.rows);
        const sendObj: Object[] = [{title: `Hoje você tem ${countTasks.rows[0].count} tarefas`}, ...todayTasks.rows];
        res.status(200).send(sendObj);
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
}