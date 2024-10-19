import { Request, Response } from "express";
import Budget from "../models/budgetModel";
import { budgetCollection } from "../database";

export const getBudget = async (req: Request, res: Response) => {

    res.json({"message" : "budget received"})
};

export const getBudgetById = (req: Request, res: Response) => {
    let id: string = req.params.id;
    res.json({"message": `budget ${id} received`})
};

export const createBudget = async(req: Request, res: Response) => {
//create new budget plan in the database
console.log(req.body);

res.json({"message": `created a new budget with data from the post message`})
};

export const updateBudget = (req: Request, res: Response) => {
    console.log(req.body);

    res.json({"message": `update budget ${req.params.id} with data from the post message`})
};

export const deleteBudget = (req: Request, res: Response) => {

    res.json({"message": `delete budget ${req.params.id} from the database`})
};