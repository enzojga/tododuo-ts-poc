import {QueryResult} from 'pg';
import connection from "../database/db.js";
import { User } from "../protocols/userProtocols.js";

export const registerUser = (user: User): Promise<QueryResult> => {
    return connection.query(`INSERT INTO users (name, password) VALUES ($1, $2)`, [user.name, user.password]);
}

export const getUser = (user: User): Promise<QueryResult<User>> => {
    return connection.query(`SELECT * FROM users WHERE name = $1`, [user.name]);
}