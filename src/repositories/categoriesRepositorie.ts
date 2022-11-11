import {QueryResult} from 'pg';
import connection from "../database/db.js";
import { Category } from '../protocols/categoryProtocols.js';

export const insertCategory = (name: String): Promise<QueryResult> => {
    return connection.query(`INSERT INTO categories (name) VALUES ($1) RETURNING "id"`, [name]);
}

export const getAllCategories = (): Promise<QueryResult<Category>> => {
    return connection.query(`SELECT * FROM categories`);
}