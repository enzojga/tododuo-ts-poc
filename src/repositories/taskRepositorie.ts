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
