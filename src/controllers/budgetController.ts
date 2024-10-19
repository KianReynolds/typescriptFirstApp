import { Request, Response } from "express";
import Budget from "../models/budgetModel";
import { budgetCollection } from "../database";

export const getBudget = async (req: Request, res: Response) => {

    res.json({"message" : "budget received"})
};




export const createBudget = async(req: Request, res: Response) => {
//create new budget plan in the database
try{
    const newPlan = req.body as Budget;

    const result = await budgetCollection.insertOne(newPlan)

    if (result) {
        res.status(201).location(`${result.insertedId}`).json({message : `Created a new user with id ${result.insertedId}`})}
        else {
        res.status(500).send("Failed to create a new user.");
        }
}
catch(error){
    if(error instanceof Error){
        console.log(`issue with inserting ${error.message}`)
    }
    else{
        console.log(`issue with ${error}`)
    }
    res.status(400).send('unable to create a new budget')
}


};