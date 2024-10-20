import { Request, Response } from "express";
import Budget, { ValiadateBudget } from "../models/budgetModel";
import { budgetCollection } from "../database";
import { ObjectId } from "mongodb";
import Joi from "joi";

export const getBudget = async (req: Request, res: Response) => {

    try {
        const budgets = (await budgetCollection.find({}).toArray()) as Budget[];
        res.status(200).json(budgets);
     
      } catch (error) {
        res.status(500).send("oppss");
      }
     
};

export const getBudgetById = async (req: Request, res: Response) => {
    
    let id:string = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const budget = (await budgetCollection.findOne(query)) as Budget;

    if (budget) {
        res.status(200).send(budget);
    }
} catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
}

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

export const deleteBudget = async (req: Request, res: Response) => {

    let id:string = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await budgetCollection.deleteOne(query);

    if (result && result.deletedCount) {
        res.status(202).json({message :`Successfully removed budget with id ${id}`});
    } else if (!result) {
        res.status(400).json({message: `Failed to remove budget with id ${id}`});
    } else if (!result.deletedCount) {
        res.status(404).json({message: `no user fround with id ${id}`});
    }
} catch (error) {
  if (error instanceof Error)
  {
   console.log(`issue with inserting ${error.message}`);
  }
  else{
    console.log(`error with ${error}`)
  }
  res.status(400).send(`Unable to delete budget`);
}

let validateResult : Joi.ValidationResult = ValiadateBudget(req.body)

 if (validateResult.error) {
   res.status(400).json(validateResult.error);
   return;
 }
};