import { TaskEntity } from "../protocols/taskProtocol.js";
import { QueryResult } from 'pg';
import connection from "../database/db.js";

export const inesrtTask = (task: TaskEntity): Promise<QueryResult> => {
    return connection.query(`INSERT INTO tasks (name, description, user_id) VALUES ($1, $2, $3)`,
        [task.name, task.description, task.user_id]);
}

export const getAllTasks = (user_id: Number): Promise<QueryResult<TaskEntity>> => {
    return connection.query(`SELECT * FROM tasks WHERE user_id=$1`, [user_id]);
}

export const getTaskById = (id: Number): Promise<QueryResult<TaskEntity>> => {
    return connection.query(`SELECT * FROM tasks WHERE id=$1`, [id]);
}

export const deleteTaskById = (id: Number): Promise<QueryResult<TaskEntity>> => {
    return connection.query(`DELETE FROM tasks WHERE id=$1`, [id]);
}

export const updateDescription = (id: Number, description: String): Promise<QueryResult> => {
    return connection.query(`UPDATE tasks SET description=$1 WHERE id=$2`, [description, id]);
}

export const insertTasksDays = (idDay: Number, idTask: Number): Promise<QueryResult> => {
    return connection.query(`INSERT INTO task_days (task_id, day_id) VALUES ($1, $2)`, [idTask, idDay]);
}

export const getTasksDaysByTaskIdAndDayId = (idDay: Number, idTask: Number): Promise<QueryResult> => {
    return connection.query(`SELECT * FROM task_days WHERE task_id=$1 AND day_id=$2`, [idTask, idDay]);
}

export const getTodayTasks = (idDay: Number, idTask: Number): Promise<QueryResult<TaskEntity>> => {
    return connection.query(`
    SELECT tasks.id, days.name as "day", tasks.name, tasks.description
    FROM tasks 
    JOIN task_days ON tasks.id=task_days.task_id 
    JOIN days ON task_days.day_id=days.id
    WHERE days.id=$1 AND tasks.user_id=$2
    `, [idDay, idTask]);
}

export const getCountTasksToday = (idDay: Number, idTask: Number): Promise<QueryResult> => {
    return connection.query(`
    SELECT COUNT(*)
    FROM tasks 
    JOIN task_days ON tasks.id=task_days.task_id 
    JOIN days ON task_days.day_id=days.id
    WHERE days.id=$1 AND tasks.user_id=$2`,
    [idDay, idTask]);
}
