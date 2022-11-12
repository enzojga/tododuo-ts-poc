import { Request, Response } from "express";
import { Category } from "../protocols/categoryProtocols.js";
import { getAllCategories, insertCategory } from "../repositories/categoriesRepositorie.js";

export const createCategory = async (req: Request, res: Response) => {
    try{
        const { name } = req.body as Category;
        const idCategory = await insertCategory(name);
        res.status(201).send(idCategory.rows[0]);
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
}

export const listAllCategories = async (req: Request, res: Response) => {
    try{
        const categories = await getAllCategories();
        res.status(200).send(categories.rows);
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
}