import {QueryResult} from 'pg';
import connection from "../database/db.js";
import { Session } from "../protocols/sessionProtocol.js";

export const insertSection = (session: Session): Promise<QueryResult> => {
    return connection.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2)`,
        [session.user_id, session.token]);
}

export const getSessions = (token: String): Promise<QueryResult<Session>> => {
    return connection.query('SELECT * FROM sessions WHERE token=$1',[token]);
}