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
try {
    const newBudget = req.body as Budget;

    const result = await budgetCollection.insertOne(newBudget)

    if (result) {
        res.status(201).location(`${result.insertedId}`).json({message : `Created a new user with id ${result.insertedId}`})}
        else {
        res.status(500).send("Failed to create a new budget.");
        }
    }
   catch (error) {
    console.error(error);
    res.status(400).send(`Unable to create new budget`);
}

};

export const updateBudget = (req: Request, res: Response) => {
    console.log(req.body);

    res.json({"message": `update budget ${req.params.id} with data from the post message`})
};

export const deleteBudget = (req: Request, res: Response) => {

    res.json({"message": `delete budget ${req.params.id} from the database`})
};