import { Request, Response } from "express";
import { Category } from "../protocols/categoryProtocols.js";
import { getAllCategories, insertCategory } from "../repositories/categoriesRepositorie.js";

export const createCategory = async (req: Request, res: Response) => {
    try{
        const { name } = req.body as Category;
        const idCategory = await insertCategory(name);
        return res.status(201).send(idCategory.rows[0]);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const listAllCategories = async (req: Request, res: Response) => {
    try{
        const categories = await getAllCategories();
        return res.status(200).send(categories.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}